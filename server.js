const app = require("./app");

// require('./webSocket');

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server staring at port ${process.env.PORT}`);
});
