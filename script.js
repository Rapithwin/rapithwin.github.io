document.getElementById("send-btn").addEventListener("click", sendMessage);
document
    .getElementById("user-input")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return; // Do nothing if input is empty

    displayMessage(userInput, "user");
    // Clear the input field
    document.getElementById("user-input").value = "";
    const response = await fetchGPTResponse(userInput);
    displayMessage(response, "bot");
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", sender);
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat
}

async function fetchGPTResponse(prompt) {
    const apiKey = "openai-api-key";
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [{ role: "user", content: prompt }],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (err) {
        console.log(err);
        return "Something went wrong with the API call";
    }
}
