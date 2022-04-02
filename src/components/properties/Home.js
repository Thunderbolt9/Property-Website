import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu";
import { ReactComponent as ServiceLogo } from "../../assets/Vector.svg";
import { Container } from "react-bootstrap";
import "../../css/Home.css";
import Footer from "../Footer";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="heroImage">
        <Menu />
        <div className="heroText">
          <h1 className="heroHeading">Let us Guide you Home</h1>
          <h3 className="heroBody">
            Everyone Deserves the Opportunity of Home
          </h3>
          <button
            className="heroButton"
            onClick={() => {
              navigate("/buyerpage");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
      <Container className="productServices">
        <p>A Better Home Buying And Selling Experience Starts Here</p>
      </Container>

      {/* Company services */}
      <Container className="services">
        <div>
          <div className="serviceIconDiv">
            <ServiceLogo className="serviceIcon" />
          </div>
          <h4>Buy</h4>
          <p>Know the real going price for the property you want</p>
          <p>Get Pre-Approved Home Loan you can avail</p>
          <p
            className="text-primary serviceCardLink"
            onClick={() => {
              navigate("/buyerpage");
            }}
          >
            {"Buy Homes >"}
          </p>
        </div>
        <div>
          <div className="serviceIconDiv">
            <ServiceLogo className="serviceIcon" />
          </div>
          <h4>Sell</h4>
          <p>Sell your home for the highest possible price</p>
          <p>Free Professional Photoshoot. Access to 15 Lac Buyers & Tenants</p>
          <p className="text-primary serviceCardLink">{"Sell Homes >"}</p>
        </div>
        <div>
          <div className="serviceIconDiv">
            <ServiceLogo className="serviceIcon" />
          </div>
          <h4>Rent</h4>
          <p>Get rent agreement absolutely free. Affordable Localities</p>
          <p>Sell on your terms and at a price you want</p>
          <p className="text-primary serviceCardLink">{"Rent Homes >"}</p>
        </div>
      </Container>

      {/* Testimonial */}
      <div className="testimonial">
        <h2 className="testimonialHeading text-center">Testimonial</h2>

        <div className="testimonialCardDiv">
          <div className="testimonialCard">
            <img
              alt="testimonial"
              className="testimonialImage"
              src="https://images.unsplash.com/photo-1512484776495-a09d92e87c3b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTJ8MTcyOTI1OHx8ZW58MHx8fHw%3D&w=1000&q=80"
            />
            <p>
              WOW! Thank you so much! I will leave a review mentioning your
              incredible customer service and how satisfied I am with your
              products.
            </p>
          </div>

          <div className="testimonialCard">
            <img
              className="testimonialImage"
              src="http://www.zimhealth.org/images/member-4.jpg"
              alt="testimonial"
            />
            <p>
              WOW! Thank you so much! I will leave a review mentioning your
              incredible customer service and how satisfied I am with your
              products.
            </p>
          </div>

          <div className="testimonialCard">
            <img
              alt="testimonial"
              className="testimonialImage"
              src="https://bizencyclopedia.com/assets/uploads/user_profiles/09c3d11d50de29f0b7be14a71b584547.jpg"
            />
            <p>
              WOW! Thank you so much! I will leave a review mentioning your
              incredible customer service and how satisfied I am with your
              products.
            </p>
          </div>
        </div>
      </div>

      {/* Latest Properties */}
      <div>
        <h3 className="latestPropertyText">Latest Properties</h3>
        <div className="latestPropertyDiv">
          <img
            alt="property"
            className="latestPropertyImage"
            src={`https://images.ctfassets.net/3s5io6mnxfqz/2IW4MOaC7MJObCYclek03J/b6b6f6d963f0413559d9677c50ee3a49/what-is-a-studio-apartment.jpeg?fm=jpg&w=900&fl=progressive`}
          />
          <img
            alt="property"
            className="latestPropertyImage"
            src={`https://images.ctfassets.net/3s5io6mnxfqz/2IW4MOaC7MJObCYclek03J/b6b6f6d963f0413559d9677c50ee3a49/what-is-a-studio-apartment.jpeg?fm=jpg&w=900&fl=progressive`}
          />
        </div>
        <p
          className="text-primary text-center latestPropertyLink"
          onClick={() => {
            navigate("/buyerpage");
          }}
        >
          {"Explore more >"}
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Home;
