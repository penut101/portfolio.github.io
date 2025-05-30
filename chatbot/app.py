from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # allows requests from frontend

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get("message")

    messages = [
        {"role": "system", "content": (
            "You are Aiden Nemeroff's personal AI assistant. "
            "Answer questions about him in a friendly, informative way. "
            "He is a CS student at Pitt, loves cybersecurity and systems programming, "
            "created a Discord bot named Qwerty, and is involved in Kappa Theta Pi and Sigma Alpha Mu."
        )},
        {"role": "user", "content": user_input}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages
        )
        reply = response.choices[0].message.content.strip()
        return jsonify({"response": reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
