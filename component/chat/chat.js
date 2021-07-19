const nik = document.querySelector(".nik"),
  forum = document.querySelector(".forum"),
  text = document.querySelector(".text"),
  btn = document.querySelector(".btn");

const messageFunc = () => {
  const mess = {
    message: text.value,
  };

  let fetchOptionsMess = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(mess),
  };

  fetch("http://127.0.0.1:5000/message", fetchOptionsMess)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

btn.addEventListener("click", messageFunc);
