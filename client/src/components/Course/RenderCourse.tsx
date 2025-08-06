"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RenderCourse() {
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    console.log("Module ID: ", params.moduleId);
    axios
      .get(
        params.moduleId
          ? `http://localhost:5000/api/courses/${params.id}/${params.moduleId}`
          : `http://localhost:5000/api/courses/${params.id}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.status);
        console.log(res.data);
        if(res.status == 404) {
          console.log("Redirecting....!");
          router.replace("/404");
        }
      })
      .catch((e) => {
        console.log(e);
        if(e.status == 404) {
          router.replace("/404");
        } else if(e.status == 403) {
          router.replace("/login");
        }
      });
  }, []);

  return <div>Course ID: {params.id}</div>;
}
