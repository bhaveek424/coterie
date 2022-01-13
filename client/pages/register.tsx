import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

import InputGroup from "../components/inputGroup";
import { useAuthState } from "../context/auth";

export default function Home() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const { authenticated } = useAuthState();

  const router = useRouter();
  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await Axios.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Coterie: Join the community</title>
        <link rel="icon" href="/images/coterie.svg" />
      </Head>

      <div
        className="h-screen bg-center bg-cover w-36"
        style={{ backgroundImage: "url(/images/register-cover.png)" }}
      ></div>

      <div className="flex flex-col justify-center pl-8">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign Up </h1>
          <p className="mb-10 text-xs">
            By continuing, you are setting up a Coterie account and agree to our
            User Agreement and Privacy Policy.
          </p>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              value={username}
              setValue={setUsername}
              type="text"
              placeholder="Username"
              error={errors.username}
            />
            <InputGroup
              className="mb-2"
              value={email}
              setValue={setEmail}
              type="email"
              placeholder="Email"
              error={errors.email}
            />
            <InputGroup
              className="mb-4"
              value={password}
              setValue={setPassword}
              type="password"
              placeholder="Password"
              error={errors.password}
            />

            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500 rounded">
              Sign Up
            </button>
          </form>
          <small>
            Already a Coterier?
            <Link href="/login">
              <a className="ml-1 text-blue-500">Log In</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
