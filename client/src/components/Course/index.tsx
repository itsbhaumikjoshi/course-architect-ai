"use client";

import { Container, Wrapper } from "@/styles/Container";
import { Box, Button, Link, TextField } from "@mui/material";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ICourse {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

export default function Courses() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses", { withCredentials: true })
      .then((response) => {
        console.log(response.status);
        response.data.reverse();
        console.log(response.data);
        if (response.status == 200) setCourses(response.data);
      })
      .catch((e) => {
        console.log(e.status);
        console.log(e.response.data.message);
        router.replace("/login");
      });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/courses",
        { input: title },
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(false);
        console.log(response);
        if (response.status == 200) {
          setCourses([response.data, ...courses]);
          setTitle("");
        }
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  return (
    <Wrapper>
      <Container>
        <h1>This is courses page</h1>
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
            padding: "10px",
            display: "flex",
            width: "500px",
            justifyContent: "space-between",
            minWidth: "250px",
            height: "auto",
            // left: "50%",
            // transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
            // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
            boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
          }}
        >
          <TextField
            type="text"
            error={!!titleError}
            helperText={titleError}
            placeholder="What do you want to learn today?"
            name="title"
            variant="standard"
            style={{ width: "90%" }}
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            onBlur={(e) => {
              if (!e.currentTarget.value) {
                setTitleError("This field cannot be empty.");
              } else {
                setTitleError("");
              }
            }}
          />
          <Button loading={loading} variant="contained" type="submit">
            Create
          </Button>
        </Box>

        {!!courses.length &&
          courses.map((course: ICourse) => (
            <>
              <div key={course.id}>
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <h3>
                  {/* <b>Created at: {new Date(course.created_at).toString()}</b> */}
                  <b>
                    Created at:{" "}
                    {new Date(course.created_at)
                      .toString()
                      .slice(
                        0,
                        new Date(course.created_at).toString().indexOf("GMT")
                      )}
                  </b>
                </h3>
                <Link
                  component={NextLink}
                  href={`/courses/${course.id}`}
                  underline="none"
                  color="primary"
                >
                  GoTo
                </Link>
              </div>
            </>
          ))}
      </Container>
    </Wrapper>
  );
}
