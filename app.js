const ADMIN_PASS = "HematTech@Admin123";

let isAdmin = false;

let posts = JSON.parse(localStorage.getItem("posts")) || [];

/* Mode */
function enterAdmin() {
  let pass = prompt("Enter Admin Password:");
  if (pass === ADMIN_PASS) {
    isAdmin = true;
    startApp();
  } else {
    alert("Wrong Password!");
  }
}

function enterUser() {
  isAdmin = false;
  startApp();
}

function startApp() {
  document.getElementById("modeSelect").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  if (!isAdmin) {
    document.getElementById("addBtn").style.display = "none";
  }

  loadPosts();
}

/* Load Posts */
function loadPosts() {
  let box = document.getElementById("posts");
  box.innerHTML = "";

  posts.forEach((p, i) => {
    let div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      ${p.media}
      <p>${p.caption}</p>
      <small>👁️ ${p.views} | ❤️ ${p.likes}</small>
      ${isAdmin ? `<br><button onclick="del(${i})">❌ Delete</button>` : ""}
    `;

    p.views++;
    box.appendChild(div);
  });

  localStorage.setItem("posts", JSON.stringify(posts));
}

/* Admin Panel */
function openPanel() {
  document.getElementById("panel").classList.remove("hidden");
}

/* Publish */
function publish() {
  let caption = document.getElementById("caption").value;
  let file = document.getElementById("file").files[0];

  let reader = new FileReader();

  reader.onload = function(e) {
    let media = "";

    if (file.type.startsWith("image")) {
      media = `<img src="${e.target.result}">`;
    } 
    else if (file.type.startsWith("video")) {
      media = `<video controls src="${e.target.result}"></video>`;
    } 
    else if (file.type.startsWith("audio")) {
      media = `<audio controls src="${e.target.result}"></audio>`;
    } 
    else {
      media = `<a href="${e.target.result}" download>📁 File</a>`;
    }

    posts.unshift({
      media: media,
      caption: caption,
      likes: 0,
      views: 0
    });

    localStorage.setItem("posts", JSON.stringify(posts));
    location.reload();
  };

  if (file) reader.readAsDataURL(file);
}

/* Delete */
function del(i) {
  posts.splice(i, 1);
  localStorage.setItem("posts", JSON.stringify(posts));
  loadPosts();
}
