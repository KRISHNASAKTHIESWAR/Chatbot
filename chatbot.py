try:
    from flask import Flask, render_template, request, jsonify
    import random
    import json
    import torch
    import pandas as pd
    import google.generativeai as genai
    from model import NeuralNet
    from nltk_utils import bag_of_words, tokenize

    app = Flask(__name__)

    employee_data = pd.read_excel('employee.xlsx')

    with open('intents.json', 'r') as json_data:
        intents = json.load(json_data)

    FILE = "data.pth"
    data = torch.load(FILE)

    input_size = data["input_size"]
    hidden_size = data["hidden_size"]
    output_size = data["output_size"]
    all_words = data['all_words']
    tags = data['tags']
    model_state = data["model_state"]

    model = NeuralNet(input_size, hidden_size, output_size)
    model.load_state_dict(model_state)
    model.eval()

    GOOGLE_API_KEY = 'AIzaSyBAQPIeH0Zt-oiordrGN6hn_McKOlllu-A'
    genai.configure(api_key=GOOGLE_API_KEY)
    generative_model = genai.GenerativeModel('gemini-1.5-flash')

    def get_leave_balance(employee_name, employee_data):
        employee = employee_data[employee_data['name'].str.lower() == employee_name.lower()]
        if not employee.empty:
            leave_balance = employee.iloc[0]['leaves_taken']
            return f"{employee_name} has {leave_balance} days of leave balance remaining."
        else:
            return f"Employee named {employee_name} was not found."

    def get_schedule(employee_name, employee_data):
        employee = employee_data[employee_data['name'].str.lower() == employee_name.lower()]
        if not employee.empty:
            schedule = employee.iloc[0]['schedule']
            return f"{employee_name}'s schedule is: {schedule}."
        else:
            return f"Employee named {employee_name} was not found."

    def extract_employee_name(user_input):
        employee_names = employee_data['name'].tolist()
        matching_names = [name for name in employee_names if name.lower() in user_input.lower()]
        if matching_names:
            return max(matching_names, key=len)
        return None

    def process_input(input_text, use_quad_bot=True):
        if use_quad_bot:
            sentence = tokenize(input_text)
            X = bag_of_words(sentence, all_words)
            X = X.reshape(1, X.shape[0])
            X = torch.from_numpy(X).to(torch.float32)
            output = model(X)
            _, predicted = torch.max(output, dim=1)
            tag = tags[predicted.item()]
            probs = torch.softmax(output, dim=1)
            prob = probs[0][predicted.item()]

            if prob.item() >= 0.81:
                for intent in intents['intents']:
                    if tag == intent["tag"]:
                        if "action" in intent:
                            employee_name = extract_employee_name(input_text)
                            if intent["action"] == "fetch_employee_schedule":
                                if employee_name:
                                    return get_schedule(employee_name, employee_data)
                                else:
                                    return "Please provide a valid employee name to fetch the schedule."
                            elif intent["action"] == "fetch_leave_balance":
                                if employee_name:
                                    return get_leave_balance(employee_name, employee_data)
                                else:
                                    return "Please provide a valid employee name to fetch the leave balance."
                        else:
                            return random.choice(intent['responses'])
            else:
                return "I'm not sure how to respond to that. Can you please rephrase?"
        else:
            response = generative_model.generate_content(input_text)
            return response.text

    @app.route('/')
    def home():
        return render_template('demoo.html')

    @app.route('/redirect/<page_name>')
    def redirect_to_page(page_name):
        if page_name == 'demoo':
            return render_template('demoo.html')
        elif page_name == 'about':  
            return render_template('about.html')
        elif page_name == 'contact':
            return render_template('contact.html')
        elif page_name == 'blog':
            return render_template('blog.html')

    @app.route('/send-message', methods=['POST'])
    def send_message():
        message = request.json['message']
        use_quad_bot = request.json['useQuadBot']
        response = process_input(message, use_quad_bot)
        return jsonify({'response': response})

    if __name__ == '__main__':
        app.run(debug=True)

except Exception as e:
    print(e)