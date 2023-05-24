import express from "express";
import cors from "cors";
import db from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());
db.once("open", () => {
  console.log("Connected to database");
});
db.on("error", (err) => {
  console.log("Database error:", err);
});
app.get("/",(req,res)=>{
    res.send('Connection success');
})
let url;
app.post("/add",(req,res)=>{
    console.log(req.body)
    url = `https://google.com`
    const randomKey = Math.floor(Math.random() * 100000); // Generate a random key
    const shortUrl = `https://hashurlshortener.onrender.com/${12334}`; 
    res.send({ "Shortened": shortUrl });
})
app.get("/:key", (req, res) => {
    const key = req.params.key;
    if (key === "12334") { // Check if the provided key matches the expected value
      res.redirect("https://google.com"); // Redirect to the main URL (https://google.com)
    } else {
      res.status(404).send("Shortened URL not found"); // Handle if the provided key doesn't match
    }
  });
app.listen(5000, () => {
  console.log(`server started on http://localhost:${5000}`);
});
