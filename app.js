const app = require("./authentication/index");
const mongoose = require("mongoose");
const db = require("./authentication/db/db");
const PORT = process.env.PORT || 5000;

mongoose.connect(`${db.url}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
console.log(PORT);
app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log("Server start");
});
