"use client"

import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await fetch('/api/auth/register', {
      method: "POST",
      body: {
        email,
        password,
      },
    });

    console.log(response)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="E-mail" 
          // type="email"
          value={email} 
          onChange={e => setEmail(e.target.value)}
          required
        />
        <TextField 
          label="Password" 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <Button type="submit" hidden={true} />
      </form>
    </div>
  );
}
