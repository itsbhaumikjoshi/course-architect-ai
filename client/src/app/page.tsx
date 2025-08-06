import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home: Course Architect AI",
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}
