const generateResponse = (chatElement) => {
    const userMessage = chatElement.querySelector("p").textContent;

    $.ajax({
        type: "POST",
        url: "/chat",
        data: { user_input: userMessage },
        success: function (data) {
            const incomingChatLi = createChatLi(data.response, "incoming");
            document.querySelector(".chatbox").appendChild(incomingChatLi);
            document.querySelector(".chatbox").scrollTo(0, document.querySelector(".chatbox").scrollHeight);

            // Optionally, update the negotiation state if needed
            // negotiation_state = data.negotiation_state;

            // If you want to continue the conversation immediately, you can call generateResponse again
            // generateResponse(incomingChatLi);
        },
        error: function (error) {
            console.log("Error:", error);
        },
    });
}
