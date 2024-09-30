const recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;

const synthesis = window.speechSynthesis;
let isListening = false;

const startListeningButton = document.getElementById("start-listening-button");

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function speak(text) {
    var utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synthesis.speak(utterance);
}

function showNotification() {
    const chatContainer = document.querySelector(".chat-container");
    const notification = document.createElement("div");
    notification.textContent = "Microphone is on";
    notification.classList.add("notification");
    chatContainer.appendChild(notification);

    notification.offsetHeight;
    notification.classList.add("show"); 
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            chatContainer.removeChild(notification);
        }, 500);
    }, 3000);
}

function startListening() {
    recognition.start();
    isListening = true;
    showNotification();
}

recognition.onresult = function(event) {
    var transcript = event.results[0][0].transcript;
    appendMessage("You: " + transcript, "right-message");
    fetch("/send-message", {
        method: "POST",
        body: JSON.stringify({ message: transcript, useQuadBot: useQuadBot }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.response) {
            setTimeout(() => {
                appendMessage("Bot: " + data.response, "left-message");
                setTimeout(() => {
                    speak(data.response);
                }, 500);
            }, 300);
        } else {
            setTimeout(() => {
                appendMessage("Bot: I'm sorry, I didn't understand that.", "left-message");
                setTimeout(() => {
                    speak("I'm sorry, I didn't understand that.");
                }, 500);
            }, 300);
        }
    })
    .catch(error => {
        console.error('Error sending message:', error);
        setTimeout(() => {
            appendMessage("Bot: Oops! Something went wrong.", "left-message");
            setTimeout(() => {
                speak("Oops! Something went wrong.");
            }, 500);
        }, 300);
    });
}

recognition.onerror = function(event) {
    console.error('Speech recognition error:', event.error);
    isListening = false;
}

function appendMessage(message, side) {
    var chatBox = document.getElementById("chat-box");
    var newMessage = document.createElement("div");
    newMessage.textContent = message;
    newMessage.classList.add("message", side);
    chatBox.appendChild(newMessage);
    
    setTimeout(() => {
        newMessage.style.opacity = "1";
        newMessage.style.transform = "translateY(0)";
    }, 100);

    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    var userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        appendMessage("You: " + userInput, "right-message");
        document.getElementById("user-input").value = "";
        fetch("/send-message", {
            method: "POST",
            body: JSON.stringify({ message: userInput, useQuadBot: useQuadBot }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.response) {
                setTimeout(() => {
                    appendMessage("Bot: " + data.response, "left-message");
                    speak(data.response);
                }, 700);
            } else {
                setTimeout(() => {
                    appendMessage("Bot: I'm sorry, I didn't understand that.", "left-message");
                    speak("I'm sorry, I didn't understand that.");
                }, 400);
            }
        })
        .catch(error => {
            console.error('Error sending message:', error);
            setTimeout(() => {
                appendMessage("Bot: Oops! Something went wrong.", "left-message");
            }, 400);
        });
    }
}

function toggleChat() {
    const chatContainer = document.querySelector(".chat-container");
    const chatButton = document.querySelector(".chat-button");

    if (chatContainer.classList.contains("active")) {
        setTimeout(() => {
            chatContainer.classList.remove("active");
        }, 30);
    } else {
        chatContainer.classList.add("active");
        const chatButtonRect = chatButton.getBoundingClientRect();
        chatContainer.style.top =  "260px";
        chatContainer.style.bottom = "1000px";
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.style.display = 'none';
    });

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
});

let useQuadBot = true;

function switchBot() {
    useQuadBot = !useQuadBot;
    const botName = useQuadBot ? 'QuadBot' : 'Z Bot';
    document.querySelector('.chat-container h2').textContent = botName;
    
}
