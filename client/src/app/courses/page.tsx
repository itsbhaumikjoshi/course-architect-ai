import { Metadata } from "next";
import Courses from "@/components/Course";

export const metadata: Metadata = {
  title: "Courses: Course Architect AI",
};

export default function CoursesPage() {
  return <Courses />;
}
