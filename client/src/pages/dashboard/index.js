import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import instance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisplay, setDisplay] = useState(false);
  const [userData, setUserData] = useState("");

  // On logout handler
  const onLogoutHandler = async () => {
    await instance.get("/api/user/logout");
    navigate("/");
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

  const getUserData = async () => {
    const result = await instance.get("/api/user/profile");
    if (result.data.success) setUserData(result.data.data);
  };

  useEffect(() => {
    onVerifyUser();
    getUserData();
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        {isLoading && <CircularProgress />}
        {isDisplay && (
          <>
            <Box
              sx={{
                padding: "3rem",
                fontSize: "1.5rem",
                borderRadius: "10px",
                textAlign: "center",
                boxShadow: "0px 0px 10px 0px #808080a6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "3rem",
              }}
            >
              Welcome <span style={{ color: "blue" }}>{userData}</span>
              <Button variant="contained" onClick={() => onLogoutHandler()}>
                Logout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
