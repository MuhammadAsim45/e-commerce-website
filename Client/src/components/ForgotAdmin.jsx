import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Navbar2 } from "./Navbar2";
import axios from "axios";
import { Form } from "react-bootstrap";
const ForgotAdmin = () => {
  const [email, setEmail] = useState({ Email: "" });
  const submitEmail = async (e) => {
    e.preventDefault();
    const { response } = await axios.post("/forgotadmin", email);
    setEmail({ email: "" });
  };
  return (
    <>
      <Navbar2 />

      <div className="container" style={{ position: "relative", top: "65px" }}>
        <h1 className="text-light">verify your email</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="Email"
              onChange={(e) => setEmail({ Email: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitEmail}>
            Send
          </Button>
        </Form>
      </div>
    </>
  );
};

export default ForgotAdmin;
