import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { SearchIcon } from "@heroicons/react/outline";

function Header() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3  bg-black bg-opacity-80 md:px-10  border-b  items-center">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="relative flex items-center h-16 cursor-pointer my-auto"
      >
        <Image
          src="https://logos-world.net/wp-content/uploads/2020/04/YouTube-Logo.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className="flex items-center md:border-gray-200 md:border md:shadow-sm h-10 w-full">
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          type="text"
          //   placeholder={placeholder ? placeholder : "Start your search"}
          className="text-white flex-grow pl-5 bg-black outline-none text-lg placeholder-gray-500"
          placeholder="Search"
        />
        <SearchIcon className="h-11 py-2 cursor-pointer hidden md:inline-flex sticky md:mx-2 text-white" />
      </div>
    </header>
  );
}

export default Header;
