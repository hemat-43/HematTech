const ADMIN_PASS = "HematTech@2026";

let isAdmin = false;
let posts = JSON.parse(localStorage.getItem("posts")) || [];

/* Mode */
function adminLogin() {
  let pass = prompt("Enter Password:");
  if (pass === ADMIN_PASS) {
    isAdmin = true;
    start();
  } else {
    alert("Wrong!");
  }
}

function userMode() {
  isAdmin = false;
  start();
}

function start() {
  document.getElementById("mode").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  if (!isAdmin) {
    document.getElementById("inputBox").style.display = "none";
  }

  loadPosts();
}

/* Load Posts */
function loadPosts() {
  let box = document.getElementById("posts");
  box.innerHTML = "";

  posts.forEach(p => {
    let div = document.createElement("div");
    div.className = "post";
    div.innerHTML = p;
    box.appendChild(div);
  });
}

/* Send Post */
function send() {
  let text = document.getElementById("text").value;
  let file = document.getElementById("file").files[0];

  let reader = new FileReader();

  reader.onload = function(e) {
    let media = "";

    if (file && file.type.startsWith("image")) {
      media = `<img src="${e.target.result}">`;
    } 
    else if (file && file.type.startsWith("video")) {
      media = `<video controls src="${e.target.result}"></video>`;
    } 
    else if (file && file.type.startsWith("audio")) {
      media = `<audio controls src="${e.target.result}"></audio>`;
    } 
    else if (file) {
      media = `<a href="${e.target.result}" download>📁 File</a>`;
    }

    let post = `
      ${media}
      <p>${text}</p>
    `;

    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("text").value = "";
    loadPosts();
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    posts.unshift(`<p>${text}</p>`);
    localStorage.setItem("posts", JSON.stringify(posts));
    loadPosts();
  }
}
