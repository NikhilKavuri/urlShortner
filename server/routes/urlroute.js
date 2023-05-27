import express from 'express';
// import the controller 
import { Addurl, getUrl } from '../controllers/urlAdd.js';
const app = express();
app.use(express.json());

const router = express.Router();
router.get("/",(req,res)=>{
    res.send("welcome")
})
// post method to save the url into database
router.post("/addurl",Addurl)
// redirect for the given url
router.get("/:key",getUrl)

export default router;