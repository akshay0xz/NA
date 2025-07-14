let currentChatId = null;

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB0VwBfmpTy1T2W-2OPFpael7jBCeUQRSE",
  authDomain: "inspire24-4cc84.firebaseapp.com",
  databaseURL: "https://inspire24-4cc84-default-rtdb.firebaseio.com",
  projectId: "inspire24-4cc84",
  storageBucket: "inspire24-4cc84.firebasestorage.app",
  messagingSenderId: "1062196864061",
  appId: "1:1062196864061:web:d60b55044601205f5a3654",
  measurementId: "G-MBZR5JKKWX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Elements
const chatContainer = document.getElementById("chat-container");
const chatBox = document.getElementById("chat-box");
const inputBox = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");
const idPrompt = document.getElementById("id-prompt");
const enterIdBtn = document.getElementById("enter-id-btn");

// Swipe open
let touchStartX = 0;
let touchEndX = 0;

document.body.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.body.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchEndX - touchStartX > 100) {
    idPrompt.style.display = "flex";
  }
});

// Manual ID input
enterIdBtn.addEventListener("click", () => {
  const chatIdInput = document.getElementById("chat-id").value.trim();
  if (chatIdInput !== "") {
    currentChatId = chatIdInput;
    idPrompt.style.display = "none";
    chatContainer.style.display = "block";
    loadMessages();
  }
});

// Send message
sendBtn.addEventListener("click", () => {
  const message = inputBox.value.trim();
  if (message !== "" && currentChatId) {
    const msgRef = ref(db, "chats/" + currentChatId);
    push(msgRef, { text: message });
    inputBox.value = "";
  }
});

// Load messages
function loadMessages() {
  const msgRef = ref(db, "chats/" + currentChatId);
  chatBox.innerHTML = "";
  onChildAdded(msgRef, (snapshot) => {
    const msg = snapshot.val();
    const p = document.createElement("p");
    p.textContent = msg.text;
    chatBox.appendChild(p);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}
