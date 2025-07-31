import Login from "@/components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login: Course Architect AI",
};

export default function LoginPage() {
  return <Login />;
}
