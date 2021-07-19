const use = document.querySelector(".use"),
  psw = document.querySelector(".psw"),
  buttn = document.querySelector(".buttn"),
  regist = document.querySelector(".regist"),
  entrance = document.querySelector(".entrance"),
  blockEntrance = document.querySelector(".block_entrance"),
  blockRegist = document.querySelector(".block_regist");

let a = 1;

console.log(psw);

const objList = () => {
  let user = {
    username: use.value,
    password: psw.value,
    id: a++,
  };

  console.log(user.username);

  let fetchOption = {
    method: "POST",
    headers: {
      Accept: "application/json;text/plain",
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  };
  console.log(fetchOption);
  fetch("http://127.0.0.1:5000/regist", fetchOption)
    .then((res) => res.json())
    .then((body) => console.log(body))
    .catch((error) => console.log(error));

  // if (i === 1) {
  //   blockRegist.classList.remove("open");
  //   blockRegist.classList.add("close");
  //   i = 0;
  // }
  // location.href = "http://127.0.0.1:5500/component/chat.html";
};

buttn.addEventListener("click", objList);

let i = 0;

regist.addEventListener("click", () => {
  if (i === 0) {
    blockRegist.classList.remove("close");
    blockRegist.classList.add("open");
    i = 1;
  } else if (i === 1) {
    blockRegist.classList.remove("open");
    blockRegist.classList.add("close");
    blockEntrance.classList.add("open");
    i = 0;
  }
});
