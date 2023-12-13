// Add this code inside your document.addEventListener("DOMContentLoaded", function () { ... });

const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbot = document.querySelector(".chatbot");

chatbotToggler.addEventListener("click", () => {
    // Toggle the "show-chatbot" class on the body to control chatbox visibility
    document.body.classList.toggle("show-chatbot");
});


const generateResponse = async (chatElement) => {
    const userMessage = chatElement.querySelector("p").textContent;

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `user_input=${encodeURIComponent(userMessage)}`,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const incomingChatLi = createChatLi(data.response, "incoming");
        document.querySelector(".chatbox").appendChild(incomingChatLi);
        document.querySelector(".chatbox").scrollTo(0, document.querySelector(".chatbox").scrollHeight);

        // Optionally, update the negotiation state if needed
        // negotiation_state = data.negotiation_state;

        // If you want to continue the conversation immediately, you can call generateResponse again
        // generateResponse(incomingChatLi);
    } catch (error) {
        console.error("Error:", error);
    }
};
