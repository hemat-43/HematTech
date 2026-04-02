const ADMIN_PASS = "HematTech#432"; // قوي کوډ

let posts = JSON.parse(localStorage.getItem("posts")) || [];
let chat = JSON.parse(localStorage.getItem("chat")) || [];

/* Load Posts */
function loadPosts() {
  let box = document.getElementById("posts");
  box.innerHTML = "";

  posts.reverse().forEach(p => {
    let div = document.createElement("div");
    div.className = "post";
    div.innerHTML = p;
    box.appendChild(div);
  });
}
loadPosts();

/* Admin Login */
function login() {
  let pass = prompt("Enter Secret Code:");
  if (pass === ADMIN_PASS) {
    adminPanel();
  } else {
    alert("Access Denied!");
  }
}

/* Admin Panel */
function adminPanel() {
  let type = prompt(
`1: Text
2: Image
3: Video
4: Audio
5: File Link`
  );

  let content = "";

  if (type == "1") {
    let text = prompt("Write text:");
    content = `<p>${text}</p>`;
  }

  if (type == "2") {
    let url = prompt("Image URL:");
    content = `<img src="${url}">`;
  }

  if (type == "3") {
    let url = prompt("Video URL:");
    content = `<video controls src="${url}"></video>`;
  }

  if (type == "4") {
    let url = prompt("Audio URL:");
    content = `<audio controls src="${url}"></audio>`;
  }

  if (type == "5") {
    let url = prompt("File URL:");
    content = `<a href="${url}" target="_blank">📁 Download File</a>`;
  }

  posts.unshift(content);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}

/* Chat */
function loadChat() {
  let box = document.getElementById("chat");
  box.innerHTML = "";

  chat.forEach(m => {
    let p = document.createElement("p");
    p.textContent = m;
    box.appendChild(p);
  });
}
loadChat();

function sendMsg() {
  let input = document.getElementById("msg");
  chat.push(input.value);
  localStorage.setItem("chat", JSON.stringify(chat));
  input.value = "";
  loadChat();
} 
