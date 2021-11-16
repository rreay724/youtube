import {
  HomeIcon,
  CollectionIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";
import { AiOutlineCompass } from "react-icons/ai";

function Sidebar() {
  return (
    <div
      className="overflow-scroll pt-2 w-72 bg-black-light hidden sm:inline-flex md:inline-flex 
    lg:inline-flex xl:inline-flex 2xl:inline-flex"
    >
      <div className="w-full">
        <div className="sidebarComponent">
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
