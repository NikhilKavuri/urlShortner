import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function MainCard() {
  const [urlValue, setUrlValue] = useState("");
  const [short, setShort] = useState("");
  const [alias, setAlias] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const API_URL = "https://hashurlshortener.onrender.com";
  console.log(alias);
  const handleClick = () => {
    fetch(API_URL + "/addurl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputUrl: urlValue,
        alias: alias,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setShort(data.Shortened);
        setIsShortened(true);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  const handleShortenOneMore = () => {
    setUrlValue("");
    setIsShortened(false);
    setShort("");
  };
  console.log(short);
  console.log(urlValue);
  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ position: "relative", left: "40%" }}>
          {isShortened ? "Your URL is below" : "Paste Your URL here"}
        </Card.Title>

        <Card.Text>
          <form
            onSubmit={ (event) => {
              event.preventDefault();
               handleClick();
            }}
          >
            <Input
              placeholder="Your URL"
              required
              sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
              endDecorator={<SearchIcon />}
              value={urlValue}
              onChange={(e) => {
                setUrlValue(e.target.value);
              }}
            />
            <Input
              placeholder="Alias"
              required
              sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
              value={alias}
              onChange={(e) => {
                setAlias(e.target.value);
              }}
            />
            <p ><strong style={{color:"violet"}}>Your URL is: </strong>{short}</p>
            {isShortened ? (
              <Button
                style={{ position: "relative", left: "38%", width: "15em" }}
                onClick={handleShortenOneMore}
              >
                Shorten One More
              </Button>
            ) : (
              <Button
                style={{ position: "relative", left: "39%", width: "15em" }}
                type="submit"
              >
                Short
              </Button>
            )}
          </form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MainCard;
// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Input from "@mui/joy/Input";
// import SearchIcon from "@mui/icons-material/Search";
// function MainCard() {
//   const [urlValue, setUrlValue] = useState("");
//   const [isShortened, setIsShortened] = useState(false);
//   const [responseText, setResponseText] = useState("");
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await fetch("http://localhost:5000/addurl", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           url: urlValue,
//         }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setResponseText(data.Shortened);
//         setIsShortened(true);
//         console.log("URL successfully shortened!");
//       } else {
//         console.log("Error occurred while shortening URL");
//       }
//     } catch (error) {
//       console.log("Error occurred while making the API call:", error);
//     }
//   };
//   const handleShortenOneMore = () => {
//     setIsShortened(false);
//     setUrlValue("");
//     setResponseText("");
//   };
//   return (
//     <Card>
//       <Card.Body>
//         <Card.Title style={{ position: "relative", left: "40%" }}>
//           {isShortened ? "Shorten Another URL" : "Paste Your URL here"}
//         </Card.Title>
//         <Card.Text>
//           <form onSubmit={handleSubmit}>
//             <Input
//               placeholder="Your URL"
//               required
//               sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
//               endDecorator={<SearchIcon />}
//               value={isShortened ? responseText : urlValue}
//               onChange={(e) => {
//                 setUrlValue(e.target.value);
//               }}
//             />
//             {isShortened ? (
//               <Button
//                 style={{ position: "relative", left: "39%", width: "15em" }}
//                 onClick={handleShortenOneMore}
//               >
//                 Shorten One More
//               </Button>
//             ) : (
//               <Button
//                 style={{ position: "relative", left: "39%", width: "15em" }}
//                 type="submit"
//               >
//                 Search
//               </Button>
//             )}
//           </form>
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }
// export default MainCard;
