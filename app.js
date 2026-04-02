const ADMIN_PASS = "HematTech@Pro";

let posts = JSON.parse(localStorage.getItem("posts")) || [];

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
loadPosts();

/* Theme */
function toggleTheme() {
  document.body.classList.toggle("light");
}

/* Login */
function login() {
  let pass = prompt("Enter Secret Code:");
  if (pass === ADMIN_PASS) {
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    alert("Access Denied!");
  }
}

/* Publish */
function publish() {
  let caption = document.getElementById("caption").value;
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
      <p>${caption}</p>
    `;

    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("adminPanel").classList.add("hidden");
    loadPosts();
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}
