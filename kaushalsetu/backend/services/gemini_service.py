"""
KaushalSetu AI: Gemini Service
Handles interaction with Google Gemini 2.5 Flash and Gemini Vision models.
Gracefully handles API keys, image payloads, JSON parsing, and provides deterministic
domain fallbacks to ensure 100% pipeline reliability under any network condition.
"""

import os
import json
import base64
import re
from typing import Dict, Any, Optional

# Load env variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

try:
    from google import genai
    from google.genai import types
    GENAI_AVAILABLE = True
except ImportError:
    GENAI_AVAILABLE = False


def get_genai_client():
    if not GENAI_AVAILABLE or not GEMINI_API_KEY:
        return None
    try:
        return genai.Client(api_key=GEMINI_API_KEY)
    except Exception as e:
        print(f"[GeminiService] Warning initializing client: {e}")
        return None


def clean_json_text(text: str) -> str:
    """Extract and parse clean JSON from model markdown fences."""
    text = text.strip()
    match = re.search(r"```(?:json)?\s*(\{.*?\}|\[.*?\])\s*```", text, re.DOTALL)
    if match:
        return match.group(1).strip()
    return text


def generate_structured_response(
    prompt: str,
    image_b64: Optional[str] = None,
    system_instruction: Optional[str] = None,
    fallback_data: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    Calls Gemini 2.5 Flash / Vision. If API key is absent or call fails, returns fallback_data.
    """
    client = get_genai_client()
    if not client:
        return fallback_data or {"status": "ok", "mock": True}

    try:
        contents = []
        if image_b64:
            # Strip header if present (e.g. data:image/jpeg;base64,...)
            if "," in image_b64:
                header, encoded = image_b64.split(",", 1)
                mime_match = re.search(r"data:([^;]+);", header)
                mime_type = mime_match.group(1) if mime_match else "image/jpeg"
            else:
                encoded = image_b64
                mime_type = "image/jpeg"

            raw_bytes = base64.b64decode(encoded)
            contents.append(
                types.Part.from_bytes(data=raw_bytes, mime_type=mime_type)
            )

        contents.append(prompt)

        config = types.GenerateContentConfig(
            temperature=0.2,
            response_mime_type="application/json"
        )
        if system_instruction:
            config.system_instruction = system_instruction

        # Gemini 3.8 Flash model
        response = client.models.generate_content(
            model="gemini-3.8-flash",
            contents=contents,
            config=config
        )

        clean_text = clean_json_text(response.text)
        return json.loads(clean_text)

    except Exception as e:
        print(f"[GeminiService] Error calling Gemini: {e}")
        return fallback_data or {"status": "fallback", "error": str(e)}
