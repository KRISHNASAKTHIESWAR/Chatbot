# Chatbot

## Overview
This project is a comprehensive application that integrates a chatbot with a web-based interface. It includes functionalities such as a chatbot powered by a machine learning model, employee data retrieval, and a fully responsive front-end with custom styles and JavaScript. The project is implemented using Python (Flask), HTML, CSS, and JavaScript.

## Features
- Chatbot Functionality: A conversational agent built with Python and trained using PyTorch.

- Machine Learning Model: A custom-trained model for handling intents and providing chatbot responses.

- Employee Data Management: Ability to retrieve and display employee data from Excel files.

- Interactive Frontend: Built using HTML, CSS, and JavaScript, providing a user-friendly interface.

- Voice Commands: Integration of voice recognition for interacting with the chatbot.

- Real-time Response: The chatbot responds to user inputs in real-time and provides information on multiple topics.

## Project Structure


```

│   ├── chatbot.py
│   ├── gptbot.py
│   ├── model.py
│   ├── nltk_utils.py
│   ├── train.py
│   ├── intents.json
    ├── README.md
│   ├── static/
│   │   ├── script.js
│   │   └── styles.css
│   ├── templates/
│   │   ├── about.html
│   ├── blog.html
│   ├── contact.html
│   └── demoo.html

```
## Installation Instructions
1.Clone the Repository:
```
  git clone https://github.com/yourusername/repositoryname.git
  cd repositoryname
```
2.Install Dependencies:

Make sure Python is installed on your machine. You can install the required packages using:
```
pip install -r requirements.txt
```
3.Run the Project

Start the Flask application:
```
python app.py
```
4.Access the Web Interface:
```
http://localhost:5000
```
## Model Training

The chatbot model in this project is trained using a machine learning model built with PyTorch. The training process involves preparing the data, defining the model architecture, and running the training loop to learn from the data.

### Steps to Train the Model:
1. Prepare the Dataset
- The model uses an intents dataset (intents.json) which contains training data in the form of questions (inputs) and their associated categories or intents (outputs).
- Each intent has predefined patterns and corresponding responses that the chatbot can use.

2. Model Architecture
  - The model is a simple feedforward neural network that uses PyTorch. The architecture consists of:
       - Input Layer: Accepts the tokenized and vectorized form of the user inputs.
       - Hidden Layer(s): Responsible for learning the patterns from the input data.
       - Output Layer: Classifies the input into different categories (intents).

3.Training the model 

1. Loading and processing the dataset.
2. Tokenizing and vectorizing the input text using a bag-of-words approach.
3. Running a forward pass through the neural network.
4. Computing the loss (error) using a loss function such as cross-entropy loss.
5. Backpropagating the error and adjusting the weights using an optimizer like Adam.
6. Iterating over the dataset for multiple epochs to minimize the loss and improve the model's accuracy.

```
# Example of the training loop
for epoch in range(num_epochs):
    optimizer.zero_grad()
    outputs = model(inputs)
    loss = criterion(outputs, labels)
    loss.backward()
    optimizer.step()

    if (epoch+1) % 100 == 0:
        print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')
```
4. Saving the Trained Model
 - After training, the model is saved as a .pth file (data.pth) which can later be loaded for making predictions.
```
torch.save(model.state_dict(), "data.pth")
```
5. Fine-Tuning the Model
   - You can further fine-tune the model by adding more intents, patterns, or responses to the dataset and retraining it.
   - The model can be re-trained by running the train.py script.

6. Train the model:
   To train the model, run the following command:
   ```
   python train.py
   ```
This script will:
- Load the dataset.
- Train the model based on the defined architecture.
- Save the trained model to data.pth for future inference.
## Usage
### Chatbot Interaction
- Enter queries in the chat input to interact with the chatbot. The bot can respond to various intents defined in intents.json and has a real-time response mechanism.
  
### Employee Data Retrieval
- Use the provided interface to upload or interact with employee data in Excel format. The script processes and displays relevant information.

### Voice Commands
- The chatbot also accepts voice input, which can be used to ask questions or request specific data.

## Project Screenshots
###  1. Chatbot Interface
![Logo](https://github.com/AzimMohideen/Chatbot/blob/main/Interface.png)
### 2. Tech Solutions Home Page
![Logo](https://github.com/AzimMohideen/Chatbot/blob/main/HomePage.png)


## Technologies Used

- Python: Backend logic, chatbot development using PyTorch.
- Flask: Web framework used for developing the web interface.
- HTML/CSS/JavaScript: Frontend development for the user interface.
- PyTorch: Machine learning framework for training the chatbot model.
- Excel (Pandas): Data retrieval and processing from .xlsx files.

## Future Improvements

- Enhanced Model: Further training and tuning of the chatbot's NLP model for better accuracy.
- New Features: Add more intents and responses for a more comprehensive chatbot.
- Refined UI: Improve UI/UX with modern design elements.
- Deployment: Deploy the app on cloud platforms like AWS or Heroku.

## Contributing
Contributions are welcome! Please fork this repository and submit a pull request for any improvements.
- @Chorko C
- @KRISHNASAKTHIESWAR
- @bhrahmesh
## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any inquiries or issues, please contact:
- Name: Azim Mohideen
- Email: azim.mohideen@gmail.com




