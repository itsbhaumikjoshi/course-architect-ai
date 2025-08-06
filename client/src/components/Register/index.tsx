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
import { useReducer } from "react";
import { emailRegex, passwordRegex } from "@/const";
import axios from "axios";
import { useRouter } from "next/navigation";

type State = {
  email: string;
  password: string;
  cpassword: string;
  name: string;
};

type Action =
  | { type: "update"; key: string; value: string }
  | { type: "reset" };

type ErrorAction =
  | { type: "update"; key: string; value: string }
  | { type: "error"; value: boolean }
  | { type: "reset" };

const initialState: State = {
  email: "",
  password: "",
  cpassword: "",
  name: "",
};

type ErrorState = {
  emailError: string;
  nameError: string;
  passwordError: string;
  cpasswordError: string;
  showError: boolean;
};

const initialErrorState: ErrorState = {
  emailError: "",
  nameError: "",
  passwordError: "",
  cpasswordError: "",
  showError: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "reset":
      return initialState;
  }
};

const errorReducer = (state: ErrorState, action: ErrorAction): ErrorState => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "error":
      return {
        ...state,
        showError: action.value,
      };
    case "reset":
      return initialErrorState;
  }
};

export default function Register() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, dispatchError] = useReducer(errorReducer, initialErrorState);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      error.emailError ||
      error.passwordError ||
      error.cpasswordError ||
      error.nameError
    ) {
      dispatchError({ type: "error", value: true });
      return;
    }
    dispatchError({ type: "error", value: false });
    axios
      .post(
        "http://localhost:5000/api/auth/register",
        { email: state.email, password: state.password, name: state.name },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status == 200) {
          router.replace("/courses");
        }
      })
      .catch((e) => console.log(e));
  };

  const handleEmailError = () => {
    if (!state.email) {
      dispatchError({
        type: "update",
        key: "emailError",
        value: "Email feild cannot be empty.",
      });
      return;
    }

    if (!emailRegex.test(state.email)) {
      dispatchError({
        type: "update",
        key: "emailError",
        value: "Invalid email.",
      });
      return;
    }

    dispatchError({ type: "update", key: "emailError", value: "" });
  };

  const handlePasswordError = () => {
    if (!state.password) {
      dispatchError({
        type: "update",
        key: "passwordError",
        value: "Password feild cannot be empty.",
      });
      return;
    }

    if (!passwordRegex.test(state.password)) {
      dispatchError({
        type: "update",
        key: "passwordError",
        value:
          "Atleast 8 characters, 1 spacial character, 1 uppercase character, 1 lowercase character, and 1 number",
      });
      return;
    }

    dispatchError({ type: "update", key: "passwordError", value: "" });
  };

  const handleNameError = () => {
    if (!state.name) {
      dispatchError({
        type: "update",
        key: "nameError",
        value: "Name feild cannot be empty.",
      });
      return;
    }

    if (state.name.length < 10) {
      dispatchError({
        type: "update",
        key: "nameError",
        value: "Name should be at least 10 characters long.",
      });
      return;
    }

    dispatchError({ type: "update", key: "nameError", value: "" });
  };

  const handleConfirmPasswordError = () => {
    if (!state.cpassword) {
      dispatchError({
        type: "update",
        key: "cpasswordError",
        value: "Confirm Password feild cannot be empty.",
      });
      return;
    }
    if (state.cpassword != state.password) {
      dispatchError({
        type: "update",
        key: "cpasswordError",
        value: "Password and Confirm Password differs.",
      });
      return;
    }
    dispatchError({
      type: "update",
      key: "cpasswordError",
      value: "",
    });
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
          {error.showError && (
            <Alert severity="error">
              Please rectify all errors to continue.
            </Alert>
          )}

          <TextField
            type="text"
            error={!!error.nameError}
            helperText={error.nameError}
            label="Name"
            variant="standard"
            style={{ width: "100%" }}
            value={state.name}
            name="name"
            onChange={(e) =>
              dispatch({
                type: "update",
                key: e.currentTarget.name,
                value: e.currentTarget.value,
              })
            }
            onBlur={handleNameError}
          />

          <TextField
            type="email"
            error={!!error.emailError}
            helperText={error.emailError}
            label="Email"
            variant="standard"
            style={{ width: "100%" }}
            value={state.email}
            name="email"
            onChange={(e) =>
              dispatch({
                type: "update",
                key: e.currentTarget.name,
                value: e.currentTarget.value,
              })
            }
            onBlur={handleEmailError}
          />

          <TextField
            type="password"
            error={!!error.passwordError}
            helperText={error.passwordError}
            label="Password"
            name="password"
            variant="standard"
            style={{ width: "100%" }}
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "update",
                key: e.currentTarget.name,
                value: e.currentTarget.value,
              })
            }
            onBlur={handlePasswordError}
          />

          <TextField
            type="password"
            error={!!error.cpasswordError}
            helperText={error.cpasswordError}
            label="Confirm Password"
            name="cpassword"
            variant="standard"
            style={{ width: "100%" }}
            value={state.cpassword}
            onChange={(e) =>
              dispatch({
                type: "update",
                key: e.currentTarget.name,
                value: e.currentTarget.value,
              })
            }
            onBlur={handleConfirmPasswordError}
          />

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" type="submit">
              Create Account
            </Button>
            <Link
              component={NextLink}
              href="/login"
              underline="none"
              color="primary"
            >
              Login
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
