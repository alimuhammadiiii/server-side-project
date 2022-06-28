const express = require("express");

const fs = require("fs/promises");

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const data = await fs.readFile("index.html");

    res.send(`${data.toString()}`);
  } catch (error) {}
});

const port = 3000;
app.listen(port, () =>
  console.log(`server started on http://localhost:${port}`)
);
