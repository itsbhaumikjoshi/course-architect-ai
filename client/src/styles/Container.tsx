"use client";
import { styled } from "@mui/material/styles";

export const Container = styled("div")(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",
  padding: theme.spacing(2),
}));

export const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));
