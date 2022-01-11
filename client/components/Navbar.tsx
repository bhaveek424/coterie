import Link from "next/link";
import NextImage from "next/image";

const Navbar: React.FC = () => (
  <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white">
    {/* Logo and title */}
    <div className="flex items-center mt-4">
      <Link href="/">
        <a>
          <NextImage
            src="/images/coterie-homepage.svg"
            height={150}
            width={200}
          />
        </a>
      </Link>
    </div>

    {/* Search INput */}
    <div className="flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white">
      <i className="pl-4 pr-3 text-gray-500 fas fa-search"></i>
      <input
        type="text"
        className="py-1 pr-3 bg-transparent rounded w-[40rem] focus:outline-none"
        placeholder="Search"
      />
    </div>

    {/* Auth buttons */}
    <div className="flex">
      <Link href="/login">
        <a className="w-32 py-1 mr-4 leading-5 hollow blue button ">Login</a>
      </Link>
      <Link href="/register">
        <a className="w-32 py-1 leading-5 blue button">sign up</a>
      </Link>
    </div>
  </div>
);
export default Navbar;
