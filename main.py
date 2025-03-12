import webview
import requests
import json
import os
import urllib.parse
from cryptography.fernet import Fernet

# Function to load or create an encryption key
def load_key():
    key_file = "secret.key"
    if os.path.exists(key_file):
        with open(key_file, "rb") as f:
            key = f.read()
    else:
        key = Fernet.generate_key()
        with open(key_file, "wb") as f:
            f.write(key)
    return key

# Initialize key and Fernet object
key = load_key()
fernet = Fernet(key)

HISTORY_FILE = "history.json.enc"

# Function to load encrypted history (if any)
def load_history():
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "rb") as file:
            encrypted_data = file.read()
        try:
            decrypted_data = fernet.decrypt(encrypted_data)
            return json.loads(decrypted_data.decode())
        except Exception as e:
            print("Failed to decrypt history:", e)
            return []
    else:
        return []

# Function to save history in an encrypted file
def save_history(history):
    data = json.dumps(history).encode()
    encrypted_data = fernet.encrypt(data)
    with open(HISTORY_FILE, "wb") as file:
        file.write(encrypted_data)

# API class to be accessed from JS in display.html
class API:
    def __init__(self):
        self.history = load_history()

    def translate(self, text, source_lang, target_lang):
        """
        Method to process translation.
        Parameters:
          - text: text to be translated.
          - source_lang: source language.
          - target_lang: target language.
        """
        if not text.strip():
            return "Input text is empty."

        # Compose translation prompt according to specifications
        prompt = (
            f"Translate the following text from {source_lang} to {target_lang}, ensuring perfect grammar, context, and meaning, "
            "including correct usage of verb tenses such as simple past, present, and future. Pay attention to subject-verb agreement, "
            "sentence structure, and idiomatic expressions to produce a translation that is accurate, natural, and fluent. This is a translation task, "
            "not a paraphrasing task, so please provide a direct and literal translation of the source text.\n"
            f"Source text:\n{text}\n"
            "Provide the translated text only, without any additional comments, explanations, or modifications. "
            "Ensure the translation is precise, concise, and easy to understand."
        )
        
        # URL-encode prompt to embed in API URL
        encoded_prompt = urllib.parse.quote(prompt)
        api_url = f"https://api.freegpt4.ddns.net/?text={encoded_prompt}"

        try:
            response = requests.get(api_url)
            result = response.text
        except Exception as e:
            result = f"Error during translation: {str(e)}"

        # Save translation history
        translation_entry = {
            "input": text,
            "source_lang": source_lang,
            "target_lang": target_lang,
            "translated": result
        }
        self.history.append(translation_entry)
        save_history(self.history)
        
        return result

# Initialize API object to be bridged to the JS side
api_instance = API()

if __name__ == "__main__":
    # Create application window with title "LinguaGenie" and load display.html as the interface.
    # js_api object allows display.html to call methods in the API class.
    window = webview.create_window("LinguaGenie", "display.html", js_api=api_instance)
    webview.start()
