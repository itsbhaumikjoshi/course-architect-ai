"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    axios("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((response) => {
        if (response.status == 200) {
          setEmail(response.data?.email);
          setId(response.data?.id);
          setName(response.data?.name);
        }
      })
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <h1>This is home</h1>
      {email && (
        <ul>
          <li>Id: {id}</li>
          <li>Email: {email}</li>
          <li>Name: {name}</li>
        </ul>
      )}
    </>
  );
}
