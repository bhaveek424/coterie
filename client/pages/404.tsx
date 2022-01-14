import Link from "next/link";
import NextImage from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-4">
      {/* <h1 className="mt-10 mb-4 text-5xl text-gray-800">Page Not Found</h1> */}
      <NextImage src="/images/404.svg" height={500} width={900} />
      <Link href="/">
        <a className="px-4 py-2 mt-2 blue button">Home</a>
      </Link>
    </div>
  );
}
