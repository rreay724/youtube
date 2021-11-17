import { useRouter } from "next/dist/client/router";
import {
  HomeIcon,
  CollectionIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { AiOutlineCompass } from "react-icons/ai";
import { route } from "next/dist/server/router";

function Sidebar() {
  const router = useRouter();
  return (
    <div
      className="sticky pt-2 w-72 bg-black-light hidden sm:inline-flex md:inline-flex 
    lg:inline-flex xl:inline-flex 2xl:inline-flex min-h-screen"
    >
      <div className="w-full">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="sidebarComponent"
        >
          <HomeIcon className="w-10 p-2" />
          <p className="pl-5 text-sm">Home</p>
        </div>
        <div className="sidebarComponent">
          <SearchCircleIcon className="w-10 p-2" />
          <p className="pl-5 text-sm">Explore</p>
        </div>
        <div className="sidebarComponent">
          <CollectionIcon className="w-10 p-2" />
          <p className="pl-5 text-sm">Subscriptions</p>
        </div>
        <div className="border-b w-56 pt-4 border-gray-700" />
      </div>
    </div>
  );
}

export default Sidebar;
