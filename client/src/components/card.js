import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Input from "@mui/joy/Input";
import "./card.css";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function MainCard() {
  const [urlValue, setUrlValue] = useState("");
  const [short, setShort] = useState("");
  const [alias, setAlias] = useState("");
  const [isShortened, setIsShortened] = useState(false);
  const [urlError, setUrlError] = useState("");
  const [aliasErr, setAliasErr] = useState("");
  const API_URL = "https://hashurlshortener.onrender.com";

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
        if (data.error) {
          setAliasErr(data.error);
        }
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
    setAlias("");
    setAliasErr("")
  };
  const validate = (val) => {
    if (val.length === 0) {
      setUrlError("No empty URL is accepted");
    } else {
      const urlRegex =
        /^((http|https):\/\/)[-a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)$/;
      if (!urlRegex.test(val)) {
        setUrlError("Enter a valid URL");
      } else {
        setUrlError("");
      }
    }
  };
  const validateAlias = (val) => {
    if (val.length < 5) {
      setAliasErr("Alias cannot have less than 5 characters");
    } else setAliasErr("");
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ position: "relative", left: "40%" }}>
          {isShortened ? "Your URL is below" : "Paste Your URL here"}
        </Card.Title>
        <Card.Text>
          <form
            onSubmit={(event) => {
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
                validate(e.target.value);
              }}
            />
            <p className="urlErr">{urlError}</p>
            <Input
              placeholder="Alias"
              sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
              value={alias}
              onChange={(e) => {
                setAlias(e.target.value);
                validateAlias(e.target.value);
              }}
            />
            <p className="aliasErr">{aliasErr}</p>
            <p>
              <strong style={{ color: "violet" }}>Your URL is: </strong>
              {short}
            </p>
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