// import the model in which we want to work
import Saveurl from "../models/UrlModel.js";
// import the uuid
import { v4 as uuidv4 } from 'uuid';

// create the function which handles /addurl route
export const Addurl = async (req, res) => {
  try {
    let url = req.body.inputUrl;
    const existingData = await Saveurl.findOne({ url: url }).exec();
    if (existingData) {
      return res.json({ Shortened: `${existingData.shortUrl}` });
    }

    let shortUrl;
    let dataurl;

    let alias = req.body.alias;
    console.log(alias.length);

    if (alias.length > 0) {
      shortUrl = `https://hashurlshortener.onrender.com/${req.body.alias}`;
      dataurl = {
        url: req.body.inputUrl,
        key: req.body.alias,
        shortUrl: shortUrl
      };
      return res.json({ Shortened: shortUrl });
    } else {
      const uuid = uuidv4();
      let key = uuid.slice(0, 8);
      shortUrl = `https://hashurlshortener.onrender.com/${key}`;
      dataurl = {
        url: req.body.inputUrl,
        key: key,
        shortUrl: shortUrl
      };
      return res.json({ Shortened: shortUrl });
    }

    // save the object to the database
    const UrlDoc = new Saveurl(dataurl);
    await UrlDoc.save();
  } catch (error) {
    // Handle the error here
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// create another function which checks the shortened URL key and redirects to the given URL
export const getUrl = async (req, res) => {
  try {
    // store the key from the params to a variable
    const randomKey = req.params.key;

    // check through the database where it matches the random key
    const UrlData = await Saveurl.findOne({ key: randomKey });
    if (UrlData) {
      return res.redirect(UrlData.url);
    } else {
      return res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    // Handle the error here
    console.error(error);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

// app.post("/add", async (req, res) => {
//     const url = req.body.url;
//     try {
//       const existingData = await UrlModel.findOne({ longUrl: url }).exec();
//       if (existingData) {
//         res.send({ Shortened: `https://hashshortenurl.onrender.com/${existingData.shortUrl}` });
//       } else {
//         const hash = crypto.createHash("sha256").update(url).digest("hex");
//         const shortUrl = hash.slice(0, 6);
//         const data = {
//           shortUrl,
//           longUrl: url,
//         };
//         const createdData = await UrlModel.create(data);
//         res.send({ Shortened: `https://hashshortenurl.onrender.com/${createdData.shortUrl}` });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Internal server error");
//     }
//   });