import React from "react";
import Menu from "../Menu";
import "../../css/Home.css";

function Home() {
  return (
    <>
      <div className="heroImage">
        <Menu />
        <div className="heroText">
          <h1 className="heroHeading">Let us Guide you Home</h1>
          <h3 className="heroBody">
            Everyone Deserves the Opportunity of Home
          </h3>
          <button className="heroButton">Buy Now</button>
        </div>
      </div>
    </>
  );
}

export default Home;
