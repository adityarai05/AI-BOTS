(() => {
  const scriptTag = document.currentScript || document.querySelector('script[src*="/widget.js"]');
  const botId = scriptTag ? scriptTag.getAttribute("data-bot-id") : null;

  if (!botId) {
    console.warn("Chatbot widget: data-bot-id is missing");
    return;
  }

  const styles = `
  .cbw-bubble{position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:#111;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 8px 20px rgba(0,0,0,0.25);z-index:99999;}
  .cbw-panel{position:fixed;bottom:90px;right:24px;width:320px;max-height:420px;background:#fff;border:1px solid #e5e5e5;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,0.2);display:none;flex-direction:column;overflow:hidden;z-index:99999;font-family:Arial, sans-serif;}
  .cbw-header{padding:12px 14px;background:#111;color:#fff;font-size:14px;}
  .cbw-messages{flex:1;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:8px;background:#fafafa;}
  .cbw-msg{padding:8px 10px;border-radius:10px;font-size:13px;max-width:85%;}
  .cbw-user{align-self:flex-end;background:#111;color:#fff;}
  .cbw-bot{align-self:flex-start;background:#e9e9e9;color:#111;}
  .cbw-input{display:flex;border-top:1px solid #e5e5e5;}
  .cbw-input input{flex:1;border:none;padding:10px;font-size:13px;outline:none;}
  .cbw-input button{border:none;background:#111;color:#fff;padding:0 12px;cursor:pointer;}
  `;

  const styleTag = document.createElement("style");
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);

  const bubble = document.createElement("div");
  bubble.className = "cbw-bubble";
  bubble.textContent = "Chat";

  const panel = document.createElement("div");
  panel.className = "cbw-panel";

  panel.innerHTML = `
    <div class="cbw-header">Chat</div>
    <div class="cbw-messages" id="cbw-messages"></div>
    <div class="cbw-input">
      <input type="text" id="cbw-input" placeholder="Type a message..." />
      <button id="cbw-send">Send</button>
    </div>
  `;

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  const messagesEl = panel.querySelector("#cbw-messages");
  const inputEl = panel.querySelector("#cbw-input");
  const sendBtn = panel.querySelector("#cbw-send");

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `cbw-msg ${type === "user" ? "cbw-user" : "cbw-bot"}`;
    msg.textContent = text;
    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage() {
    const text = inputEl.value.trim();
    if (!text) return;

    inputEl.value = "";
    addMessage(text, "user");

    try {
      const res = await fetch("/api/chat/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId, message: text })
      });

      const data = await res.json();
      if (!res.ok) {
        addMessage(data.error || "Something went wrong", "bot");
        return;
      }

      addMessage(data.reply || "", "bot");
    } catch (err) {
      addMessage("Network error", "bot");
    }
  }

  bubble.addEventListener("click", () => {
    panel.style.display = panel.style.display === "flex" ? "none" : "flex";
  });

  sendBtn.addEventListener("click", sendMessage);
  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });
})();
