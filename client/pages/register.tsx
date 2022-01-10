import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex ">
      <Head>
        <title>Coterie: Join the community</title>
        <link rel="icon" href="/coterie.svg" />
      </Head>

      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{ backgroundImage: "url(/images/register-cover.png)" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign Up </h1>
          <p className="mb-10 text-xs">
            By continuing, you are setting up a Coterie account and agree to our
            User Agreement and Privacy Policy.
          </p>
          <form>
            <div className="mb-2">
              <input
                type="text"
                className="w-full px-3 py-2 bg-white border border-gray-400 rounded"
                placeholder="Username"
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                className="w-full px-3 py-2 bg-white border border-gray-400 rounded"
                placeholder="Email"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="w-full px-3 py-2 bg-white border border-gray-400 rounded"
                placeholder="Password"
              />
            </div>
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
