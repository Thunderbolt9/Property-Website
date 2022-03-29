import React from "react";
import { Form } from "react-bootstrap";
import "../css/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footerDiv">
        <div className="footerContent">
          <h1 className="logo">Logo</h1>
          <p className="mt-4">Contact us</p>
          <p className="mt-0 mb-0">Support Emails :</p>
          <p className="mt-0 mb-0">feedback@company.com,</p>
          <p className="mt-0">customersupport@company.com</p>
          <p className="mb-0">Telephone :</p>
          <p>2526 2526, 1800 0001</p>
        </div>
        <div className="footerContent">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control as="textarea" rows={5} placeholder="Description" />
            </Form.Group>
            <button className="footerButton" type="submit">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Footer;
