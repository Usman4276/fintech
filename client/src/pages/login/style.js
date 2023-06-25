import { styled } from "@mui/material";

export const Container = styled("div")(() => ({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const SigninFormContainer = styled("div")(() => ({
  width: "50%",
  height: "55%",
  borderRadius: "10px",
  boxShadow: "0px 0px 15px 1px #a9a9a9c7",
}));

export const Header = styled("div")(() => ({
  textAlign: "center",
  padding: "1rem 0rem",
}));

export const FieldsContainer = styled("div")(() => ({
  padding: "2rem 2rem",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
}));
