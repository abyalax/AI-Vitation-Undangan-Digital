window.addEventListener("load", function () {
    const form = document.getElementById("chatbot");
    const chatContainer = document.getElementById("chat-container");

    // Define state to track modal visibility
    let isModalOpen = false;
    // Select elements
    const openModalIcon = document.getElementById("openModalIcon");
    const modalContainer = document.getElementById("modalContainer");
    const modalOverlay = document.getElementById("modalOverlay");
    const closeModalButton = document.getElementById("closeModalButton");

    // Function to toggle modal visibility
    function toggleModal(state) {
        isModalOpen = state;
        if (isModalOpen) {
            modalContainer.classList.remove("d-none");
        } else {
            modalContainer.classList.add("d-none");
        }
    }

    // Event listener for opening modal
    openModalIcon.addEventListener("click", (e) => {
        e.preventDefault()
        toggleModal(!isModalOpen);
        console.log(isModalOpen);
    });

    // Event listener for closing modal (button or clicking outside)
    closeModalButton.addEventListener("click", (e) => {
        e.preventDefault()
        toggleModal(false);
        console.log(isModalOpen);
    });

    modalOverlay.addEventListener("click", (e) => {
        // Close modal only if clicking outside modal content
        if (e.target === modalOverlay) { toggleModal(false); console.log(isModalOpen); };
    });

    function loadChatHistory() {
        const userHistoryMessage = JSON.parse(localStorage.getItem("userMessage")) || [];
        const botHistoryMessage = JSON.parse(localStorage.getItem("botMessage")) || [];

        const messages = [];
        const maxLength = Math.max(userHistoryMessage.length, botHistoryMessage.length);

        for (let i = 0; i < maxLength; i++) {
            if (i < userHistoryMessage.length) {
                messages.push({ sender: "user", textMessage: userHistoryMessage[i] });
            }
            if (i < botHistoryMessage.length) {
                messages.push({ sender: "bot", textMessage: botHistoryMessage[i] });
            }
        }

        chatContainer.innerHTML = messages
            .map((msg) => {
                return `
          <div class="message ${msg.sender === "user" ? "user-message" : "bot-message"}">
            <div class="d-flex ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}">
            ${msg.sender === "user" ? `
              <div style="width: fit-content;" class="bg-dark-subtle rounded-3 p-1">
                <p style="font-size: 1rem;" class="text-end">${msg.textMessage}</p>
              </div>
            ` : `
              <div style="width: fit-content;" class="bg-success-subtle rounded-3 p-1">
                <p style="font-size: 1rem;" class="text-start">${msg.textMessage}</p>
              </div>
            `}
            </div>
          </div>
        `;
            })
            .join("");
    }

    loadChatHistory();

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        if (!data.prompt) {
            console.log("❌ Prompt tidak terambil");
            return;
        }

        try {
            const res = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            console.log(result);

            const userMessage = JSON.parse(localStorage.getItem("userMessage")) || [];
            const botMessage = JSON.parse(localStorage.getItem("botMessage")) || [];

            userMessage.push(data.prompt);
            botMessage.push(result.response);

            localStorage.setItem("userMessage", JSON.stringify(userMessage));
            localStorage.setItem("botMessage", JSON.stringify(botMessage));

            loadChatHistory();
        } catch (error) {
            console.error("❌ Error saat mengirim prompt:", error);
            const response = document.getElementById("response");
            if (response) {
                response.textContent = "Terjadi kesalahan, coba lagi nanti.";
            }
        }
    });
});