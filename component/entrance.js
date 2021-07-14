const blockEntrance = document.querySelector(".block_entrance"),
  userse = document.querySelector(".userse"),
  entrance = document.querySelector(".entrance"),
  pass = document.querySelector(".pass"),
  butt = document.querySelector(".butt"),
  error = document.querySelector(".error");
console.log(userse);
console.log(pass);
console.log(userse.value);

const objLists = () => {
  const users = {
    username: userse.value,
    password: pass.value,
  };

  console.log(users.username);
  let fetchOptions = {
    method: "POST",
    headers: {
      Accept: "application/json;text/plain",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(users),
  };

  fetch(" ", fetchOptions)
    .then((res) => res.json())
    .then((body) => {
      console.log(body);
      if (body.username) {
        location.href = "http://127.0.0.1:5500/component/chat/chat.html";
      }
      if (body.error) {
        error.innerText = "Вы ввели неверный логин или пароль";
      }
    })
    .catch((error) => console.log(error));

  if (s === 1) {
    blockEntrance.classList.remove("open");
    blockEntrance.classList.add("close");
    s = 0;
  }
};

butt.addEventListener("click", objLists);

let s = 0;

entrance.addEventListener("click", () => {
  if (s === 0) {
    blockEntrance.classList.remove("close");
    blockEntrance.classList.add("open");
    s = 1;
  } else if (s === 1) {
    blockEntrance.classList.remove("open");
    blockEntrance.classList.add("close");
    s = 0;
  }
});
