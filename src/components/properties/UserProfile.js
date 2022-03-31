import React, { useState } from "react";
import Menu from "../Menu";
import Footer from "../Footer";
import { Form, Button } from "react-bootstrap";
import "../../css/UserProfile.css";

export default function UserProfile({ path }) {
  const [disable, setDisable] = useState(true);
  return (
    <div>
      <Menu />
      <div className="formDiv">
        <Form>
          <h4 className="text-center">User Profile</h4>
          <br />
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" required disabled={disable} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contact</Form.Label>
            <Form.Control type="number" required disabled={disable} />
          </Form.Group>
          {path === "/profile" ? (
            ""
          ) : (
            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Make Admin" />
            </Form.Group>
          )}

          <Form.Group className="text-center">
            <Button
              variant="outline-primary"
              type="submit"
              className="button"
              onClick={() => setDisable(false)}
            >
              Edit Profile
            </Button>
            <Button
              variant="outline-primary"
              type="submit"
              className="button"
              disabled={disable}
            >
              Save
            </Button>
          </Form.Group>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
