import { Button, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import instance from "../../utils/axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  SigninFormContainer,
  Header,
  FieldsContainer,
} from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import ReCAPTCHA from "react-google-recaptcha";

const Signin = () => {
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const [isCaptcha, setCaptcha] = useState(false);

  //Signin Handler
  const onSigninHandler = async () => {
    //Validating inputs
    if (!Input.email || !Input.password) return alert("Empty fields");
    if (typeof Input.email !== "string" || typeof Input.email !== "string")
      return alert("Invalid type, should be string");

    const result = await instance.post("/api/user/login", {
      email: Input.email,
      password: Input.password,
    });

    if (result.data.success) navigate("/dashboard");
  };

  const onVerifyUser = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const result = await instance.get("/api/user/verify-user");
      setIsLoading(false);
      setDisplay(true);
      if (!result.data.success) return navigate("/");
      navigate("/dashboard");
    }, 1000);
  };

  const onChangeCaptcha = () => {
    setCaptcha(true);
  };

  useEffect(() => {
    onVerifyUser();
  }, []);

  return (
    <>
      <Container>
        {isLoading && <CircularProgress />}
        {isDisplay && (
          <SigninFormContainer>
            <Header>
              <Typography variant="h6">Signin</Typography>
            </Header>
            <FieldsContainer>
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
                value={Input.password}
                type="password"
                name="password"
                onChange={(e) =>
                  setInput({
                    ...Input,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              {/* ---------Re-Captcha-------- */}
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_SIDE_KEY}
                onChange={onChangeCaptcha}
              />
              {isCaptcha && (
                <Button variant="contained" onClick={() => onSigninHandler()}>
                  Signin
                </Button>
              )}
            </FieldsContainer>
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", textAlign: "center" }}
            >
              <Typography
                variant="body2"
                sx={{ cursor: "pointer", marginBottom: "2rem" }}
              >
                Don't have an account?
              </Typography>
            </Link>
          </SigninFormContainer>
        )}
      </Container>
    </>
  );
};

export default Signin;
