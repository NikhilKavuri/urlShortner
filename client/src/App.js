import "../src/App.css";
import MainCard from "./components/card";
export default function App(){
  return(
    <>
    <h1 className="heading">URL Shortener</h1>
    <div className="cardComponent" >
      <MainCard />
    </div>
    </>
  )
}