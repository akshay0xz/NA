let chatPanel = document.getElementById("chat-panel");
let startX = 0;
let currentChatID = "NA0041";

document.body.addEventListener("touchstart", (e) => {
  startX = e.changedTouches[0].clientX;
});

document.body.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;
  if (endX - startX > 100) {
    chatPanel.style.right = "0";
    joinChat(); // Auto-join chat room on swipe
  }
});

document.getElementById("panic").onclick = () => {
  chatPanel.style.right = "-100%";
  document.getElementById("chat-box").innerHTML = "";
};

function joinChat() {
  firebase.database().ref("chatrooms/" + currentChatID).on("child_added", (data) => {
    const msg = document.createElement("div");
    msg.textContent = data.val().text;
    document.getElementById("chat-box").appendChild(msg);
    document.getElementById("chat-box").scrollTop = document.getElementById("chat-box").scrollHeight;
  });
}

function sendMessage() {
  const msg = document.getElementById("message").value.trim();
  if (!msg || !currentChatID) return;
  firebase.database().ref("chatrooms/" + currentChatID).push({ text: msg });
  document.getElementById("message").value = "";
}
