import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { SearchIcon } from "@heroicons/react/outline";

function Header() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-black-light md:pl-6 items-center">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="relative flex items-center h-16 cursor-pointer my-auto"
      >
        <Image
          src="/YouTube-Logo.png"
          width={100}
          height={40}
          objectFit="contain"
          objectPosition="left"
          className=""
        />
      </div>
      <div className="flex items-center md:shadow-sm h-12 w-full border border-black-medium bg-black-superLight">
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          type="text"
          //   placeholder={placeholder ? placeholder : "Start your search"}
          className="text-white flex-grow pl-5 bg-black-medium outline-none text-lg placeholder-gray-500 h-12 "
          placeholder="Search"
        />
        <SearchIcon className="h-11 py-2 cursor-pointer hidden md:inline-flex sticky md:mx-2 text-white" />
      </div>
    </header>
  );
}

export default Header;
