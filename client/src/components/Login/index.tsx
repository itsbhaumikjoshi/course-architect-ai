"use client";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
import NextLink from "next/link";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { Container, Wrapper } from "@/styles/Container";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || passwordError) {
      setError(true);
      return;
    }
    window.alert(`${email} : ${password}`);
  };

  const handleEmailError = () => {
    if (!email) {
      setEmailError("Email feild cannot be empty.");
      return;
    }

    if (emailError) setEmailError("");
  };

  const handlePasswordError = () => {
    if (!password) {
      setPasswordError("Password feild cannot be empty.");
      return;
    }

    if (passwordError) setPasswordError("");
  };

  const handleGoogleLogin = () => {};

  return (
    <Wrapper>
      <Container>
        <Box
          sx={{
            "& > *": {
              margin: "15px auto",
            },
          }}
          component="form"
          onSubmit={handleSubmit}
          style={{
            border: "1px solid transparent",
            padding: "25px",
            position: "absolute",
            top: "50%",
            width: "300px",
            minWidth: "250px",
            height: "auto",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          }}
        >
          {error && (
            <>
              <Alert severity="error">
                Please rectify all errors to continue.
              </Alert>
            </>
          )}
          <TextField
            type="email"
            error={!!emailError}
            helperText={emailError}
            label="Email"
            variant="standard"
            style={{ width: "100%" }}
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            onBlur={handleEmailError}
          />

          <TextField
            type="password"
            error={!!passwordError}
            helperText={passwordError}
            label="Password"
            variant="standard"
            style={{ width: "100%" }}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            onBlur={handlePasswordError}
          />

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Link
              component={NextLink}
              href="/register"
              underline="none"
              color="primary"
            >
              Create Account
            </Link>
          </Box>
          <Divider textAlign="center">OR</Divider>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            sx={{
              textTransform: "none",
              borderColor: "#dadce0",
              color: "rgba(0,0,0,0.54)",
              backgroundColor: "#fff",
              "&:hover": {
                backgroundColor: "#f5f5f5",
              },
              fontWeight: 500,
            }}
            onClick={handleGoogleLogin}
          >
            Sign in with Google
          </Button>
        </Box>
      </Container>
    </Wrapper>
  );
}
