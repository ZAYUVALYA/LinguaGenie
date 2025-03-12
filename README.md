# LinguaGenie

LinguaGenie is a lightweight, standalone translation application that leverages an API-based approach to provide high-quality translations using OpenAI's GPT-3.5 Turbo. Unlike traditional translation applications, LinguaGenie does not use a built-in LLM but instead makes API calls to Free-GPT4-WEB-API.

This project is designed to offer a seamless translation experience, where the user interface is entirely driven by an HTML frontend (**display.html**), while the backend logic is handled by a Python script (**main.py**).

## Repository Reference
LinguaGenie utilizes the public API from the following repository:
[API GPT DDNS](https://github.com/aledipa/Free-GPT4-WEB-API)

## Project Structure
LinguaGenie is structured into two primary layers:
1. **Main Layer (User Interface)**
   - `display.html`: The front-end UI, acting as a browser-based application.
   - `styles.css`: Defines the theme, layout, and loading animations.
   - `app.js`: Handles all interactions, API calls, and UI logic.

2. **Core Layer (Processing and API Handling)**
   - `main.py`: The Python backend that handles:
     - Serving `display.html` as the main UI.
     - Processing user input and forming API requests.
     - Fetching translations from the Free-GPT4-WEB-API.
     - Encrypting and decrypting translation history.
   - `history.json`: Stores user translation history in an encrypted format.
   - `requirements.txt`: Lists required Python dependencies.

## Workflow and Logic
1. The user enters text into the input box and selects the source and target languages.
2. Upon clicking the **Translate** button, `script.js` sends the input text and language details to `main.py`.
3. `main.py` constructs the API query using the following format:

   ```
   https://api.freegpt4.ddns.net/?text=Translate the following text from {source_language} to {target_language}, ensuring perfect grammar, context, and meaning. Source text: {user_input}
   ```
4. The response from the API is extracted and returned to `app.js`.
5. The translated text is displayed in the output box, replacing the loading animation.
6. The translation is stored in `history.json` in an encrypted format.

## Dependencies
Install the required Python packages before running the application:

```
pip install -r requirements.txt
```

### `requirements.txt` Includes:
- `requests`: For making API calls.
- `tkinterweb`: For displaying the HTML interface inside a Python application.
- `cryptography`: For encrypting translation history.
- `pyttsx3`: For text-to-speech functionality.
- `SpeechRecognition`: For speech-to-text input.

## Running the Application
To start LinguaGenie, execute the following command:

```
python main.py
```

## Contribution Guide
Developers are welcome to contribute by improving the UI, optimizing the API handling, or adding additional language support.

To contribute:
1. Fork the repository.
2. Clone your fork:
   ```
   git clone https://github.com/ZAYUVALYA/LinguaGenie.git
   ```
3. Create a feature branch:
   ```
   git checkout -b feature-new-functionality
   ```
4. Commit your changes and push to GitHub.
5. Open a pull request.

## License
This project is licensed under the **GNU General Public License v3 (GPLv3)**. This means:
- You are free to use, modify, and distribute this software.
- Any modified versions must also be open-source under the same license.

For full details, see the [LICENSE](https://github.com/ZAYUVALYA/LinguaGenie/blob/main/LICENSE) file.

