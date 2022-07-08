const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("index.html");

    res.send(`${data.toString()}`);
  } catch (error) {}
});

app.post("/upload", (req, res) => {
  console.log(req.body);
  fs.writeFile("./load-tasks.json", JSON.stringify(req.body), (err) => {
    console.log(err);
  });
  res.send({ result: "success" });
});

app.get("/download", async (req, res) => {
  console.log("hello");
  try {
    const data = await fs.readFile("./load-tasks.json");
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status = 500;
    res.send();
  }
});

const port = 3000;
app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);
