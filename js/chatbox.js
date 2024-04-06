// Lưu trũ tham chiếu
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea"); // lưu trữ tham chiếu đến textarea để người dùng nhập tin nhắn.
const sendChatBtn = document.querySelector(".chat-input span"); //lưu trữ tham chiếu đến nút gửi tin nhắn.

let userMessage = null; // để lưu trữ tin nhắn của người dùng.
const API_KEY = "PASTE-YOUR-API-KEY"; // lưu trữ API key
const inputInitHeight = chatInput.scrollHeight; // lưu trữ chiều cao ban đầu của textarea

const createChatLi = (message, className) => {
    // dùng để tạo một phần tử li với nội dung và class tùy chọn.
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Định nghĩa các thuộc tính và tin nhắn cho  API
    const requestOptions = {
        method: "POST", //Gửi yêu cầu
        headers: {
            "Content-Type": "application/json", // Loại dữ liệu gửi lên
            "Authorization": `Bearer ${API_KEY}` //Thông tin xác thực
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", //Model của API sẽ sử dụng để xử lý yêu cầu
            messages: [{role: "user", content: userMessage}], //Một mảng chứa các tin nhắn đầu vào, trong đó mỗi tin nhắn gồm một role và content.
        })
    }

    // Gửi yêu cầu POST đến API, nhận phản hồi và đặt nội dung phản hồi vào phần tử <p>
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Vui lòng liên hệ 19002244 để giải đáp thắc mắc";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    userMessage = chatInput.value.trim();/// Lấy tin nhắn của người dùng và xóa khoảng trắng thừa
    if(!userMessage) return;

 
// Xóa nội dung textarea và đặt lại chiều cao ban đầu cho nó
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

// Thêm tin nhắn của người dùng vào chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    
    setTimeout(() => {
        //  Hiển thị tin nhắn "Thinking..." mtrong khi đang chờ phản hồi
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
// Điều chỉnh chiều cao của phần tử <textarea> dựa trên nội dung của nó
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    //Nếu phím Enter được nhấn mà không có phím Shift và độ rộng của cửa sổ trang web lớn hơn 800px, thì tiếp tục cuộc trò chuyện.
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
