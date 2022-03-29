import React from 'react';
import{Form,Col,Row,Container,Button} from 'react-bootstrap';
function SellerPage(){
  return(
  <Form>
  <Form.Group className="mb-3" controlId="propertyname">
    <Form.Label>Property Name</Form.Label>
    <Form.Control type="text" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="addressline1">
    <Form.Label>Address Line 1</Form.Label>
    <Form.Control type="text" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="addressline2">
    <Form.Label>Address Line 2</Form.Label>
    <Form.Control type="text" />
    </Form.Group>
    {/* <Form.Group className=" display-flex" controlId="city">
    <Form.Label>City</Form.Label>
    <Form.Control type="text" />
    </Form.Group>
    <Form.Group className="display-flex" controlId="zipcode">
    <Form.Label>Zipcode</Form.Label>
    <Form.Control type="text" />
    </Form.Group> */}
    <div>
        <Container className="display-flex">
          <Row>
            <Form>
              <Form.Group className="mb-0" controlId="SelectDropdown">
                <Row className="mt-0 ">
                  <Col md>
                    <Form.Label htmlFor="City"></Form.Label>
                    <Form.Select id="city">
                    </Form.Select>
                  </Col>
                  <Col md>
                    <Form.Label htmlFor="Zipcode"></Form.Label>
                    <Form.Select id="zipcode">
                  
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
        </Container>
      </div>

  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
  );
  }
export default SellerPage;
