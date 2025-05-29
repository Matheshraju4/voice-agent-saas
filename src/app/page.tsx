"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = async () => {
    const res = await authClient.signUp.email(
      {
        email,
        password,
        name: username,
      },
      {
        onSuccess: (ctx) => {
          window.alert("User created successfully");
          //redirect to the dashboard or sign in page
        },
        onError: (ctx) => {
          // display the error message
          window.alert("Something Went Wrong");
        },
      }
    );
  };
  if (session) {
    return <div>Logged in {session.user.name}</div>;
  }
  return (
    <div>
      <Input
        type="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
