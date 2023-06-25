import { Button, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import instance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SignupFormContainer,
  Header,
  FieldsContainer,
} from "./style";

const Signup = () => {
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const onSignupHandler = async () => {
    //Validating inputs
    if (!Input.firstname || !Input.lastname || !Input.email || !Input.password)
      return alert("Empty fields");
    if (
      typeof Input.firstname !== "string" ||
      typeof Input.lastname !== "string" ||
      typeof Input.email !== "string" ||
      typeof Input.email !== "string"
    )
      return alert("Invalid type, should be string");

    const result = await instance.post("/api/user/sign-up", {
      firstname: Input.firstname,
      lastname: Input.lastname,
      email: Input.email,
      password: Input.password,
    });

    if (result.data.success) navigate("/");
  };
  return (
    <>
      <Container>
        <SignupFormContainer>
          <Header>
            <Typography variant="h6">Signup</Typography>
          </Header>
          <FieldsContainer>
            <TextField
              id="outlined-basic"
              label="Firstname"
              variant="outlined"
              fullWidth
              value={Input.firstname}
              name="firstname"
              onChange={(e) => {
                setInput({
                  ...Input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Lastname"
              variant="outlined"
              fullWidth
              value={Input.lastname}
              name="lastname"
              onChange={(e) => {
                setInput({
                  ...Input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              value={Input.email}
              name="email"
              onChange={(e) => {
                setInput({
                  ...Input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={Input.password}
              name="password"
              onChange={(e) => {
                setInput({
                  ...Input,
                  [e.target.name]: e.target.value,
                });
              }}
            />
            <Button onClick={onSignupHandler} variant="contained">
              Signup
            </Button>
          </FieldsContainer>
          <Link
            to={"/"}
            style={{ textDecoration: "none", textAlign: "center" }}
          >
            <Typography variant="body2" sx={{ cursor: "pointer" }}>
              Already have an account
            </Typography>
          </Link>
        </SignupFormContainer>
      </Container>
    </>
  );
};

export default Signup;
