import { Metadata } from "next";
import Register from "@/components/Register";

export const metadata: Metadata = {
  title: "Register: Course Architect AI",
};

export default function RegisterPage() {
    return (
        <Register />
    );
}