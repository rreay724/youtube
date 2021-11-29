import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { SearchIcon } from "@heroicons/react/outline";

function Header() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    router.push({
      pathname: "/searchPage",
      query: {
        searchInput: searchInput,
      },
    });
    console.log(searchInput);
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-black-light  items-center">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="relative flex items-center h-14 cursor-pointer my-auto pl-6"
      >
        <Image
          src="/YouTube-Logo.png"
          width={90}
          height={30}
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className="flex items-center md:shadow-sm h-8 w-full border border-black-medium bg-black-superLight">
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          type="text"
          //   placeholder={placeholder ? placeholder : "Start your search"}
          className="text-gray-300 flex-grow pl-5 bg-black-medium outline-none text-lg placeholder-gray-500 h-9 "
          placeholder="Search"
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <SearchIcon
          className="h-11 py-3 cursor-pointer hidden md:inline-flex sticky md:mx-2 text-white"
          onClick={handleSearch}
        />
      </div>
    </header>
  );
}

export default Header;
