import pathlib
import textwrap
from PIL import Image
from IPython.display import display, Markdown
import google.generativeai as genai

def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

# Define your Google API key here
GOOGLE_API_KEY = 'AIzaSyBAQPIeH0Zt-oiordrGN6hn_McKOlllu-A'

# Configure the API key before using any model
genai.configure(api_key=GOOGLE_API_KEY)

# Instantiate the model after configuring the API key
model = genai.GenerativeModel('gemini-1.5-flash')

def main():
    print("Google Generative AI Chatbot. Type 'exit' to quit.")
    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            break
        response = model.generate_content(user_input)
        print("Bot: " + response.text)

main()