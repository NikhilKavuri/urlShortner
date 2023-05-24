import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function MainCard() {
  const [urlValue, setUrlValue] = useState("");
  const API_URL = "http://localhost:5000";
  const handleClick = () => {
    fetch(API_URL + "/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputUrl: urlValue
      })
    })
    .then((res) => res.json())
    .then((data) => {
      // Handle the response data here
      console.log("Response from backend:", data.Shortened);
      // Additional logic to process the response
    })
    .catch((err) => {
      console.log("Error:", err);
    });
  };
  console.log(urlValue);
  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ position: "relative", left: "40%" }}>
          Paste Your URL here
        </Card.Title>
        <Card.Text>
        <form
            onSubmit={(event) => {
              event.preventDefault();
              handleClick()
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
          <Button
            style={{ position: "relative", left: "39%", width: "15em" }}
            type="submit"
          >
            Search
          </Button>
          </form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default MainCard;
