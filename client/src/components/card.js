import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Input from "@mui/joy/Input";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

function MainCard() {
    const [urlValue,setUrlValue] = useState("");
    // Send the urlValue to the Api service
    console.log(urlValue)
  return (
    <Card>
      <Card.Body>
        <Card.Title style={{"position":"relative", "left":"40%"}}>Paste Your URL here</Card.Title>
        <Card.Text>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <Input
              placeholder="Your URL"
              required
              sx={{ mb: 1, fontSize: "var(--joy-fontSize-sm)" }}
              endDecorator={<SearchIcon />}
              value={urlValue}
              onChange={(e)=>{
                setUrlValue(e.target.value)
              }}
            />
            <Button style={{"position":"relative", "left":"39%",width:"15em"}} type="submit">Search</Button>
          </form>
        </Card.Text>

      </Card.Body>
    </Card>
  );
}

export default MainCard;
