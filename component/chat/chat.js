const nik = document.querySelector(".nik");
await fetch("/login")
  .then((res) => console.log(res.text()))
  .then((body) => console.log(body));
