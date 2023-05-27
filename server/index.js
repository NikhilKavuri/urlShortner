import express from "express";
import cors from "cors";
import db from "./config/db.js";
// import the routes
import urlRoute from "./routes/urlroute.js"
// initializing the app
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
// connect to database
db.once("open", () => {
  console.log("Connected to database");
});
// Handle error on database
db.on("error", (err) => {
  console.log("Database error:", err);
});
// routes
app.use("/",urlRoute);
// Start the server
app.listen(5000, () => {
  console.log(`server started on http://localhost:${5000}`);
});












// app.get("/",(req,res)=>{
  //     res.send('Connection success');
  // })
  // let url;
  // app.post("/add",(req,res)=>{
  //     console.log(req.body)
  //     url = `https://google.com`
  //     const randomKey = Math.floor(Math.random() * 100000); 
  //     const shortUrl = `https://hashurlshortener.onrender.com/${12334}`; 
  //     res.send({ "Shortened": shortUrl });
  // })
  // app.get("/:key", (req, res) => {
  //     const key = req.params.key;
  // check the key value with 
  //     if (key === "12334") { 
  //       res.redirect("https://google.com"); 
  //     } else {
  //       res.status(404).send("Shortened URL not found"); 
  //     }
  //   });