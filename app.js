import express from "express";
import { writeFile } from "fs/promises";

const app = express();
const port = 3000;

app.get("/status", (req, res) => {
  res.status(200).send("Ok");
});

app.get("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    const myData = await response.json();
    res.json(myData);
    await writeFile("data.json", JSON.stringify(myData, null, 2));
  } catch (error) {
    console.error(error);
    res.status(500).send("You have Server Error");
  }
});

app.listen(port, () => {
  console.log(`${port}`);
});
