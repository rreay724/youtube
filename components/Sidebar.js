import { useRouter } from "next/dist/client/router";
import {
  HomeIcon,
  CollectionIcon,
  SearchCircleIcon,
} from "@heroicons/react/outline";

function Sidebar() {
  const router = useRouter();
  return (
    <div
      className=" pt-2 w-24 xl:w-64 bg-black-light hidden sm:inline-flex md:inline-flex 
    lg:inline-flex xl:inline-flex 2xl:inline-flex min-h-screen fixed"
    >
      <div className="w-full ">
        <div
          onClick={() => {
            router.push("/");
          }}
          className="smallSidebarComponent xl:sidebarComponent"
        >
          <HomeIcon className="w-10 p-2 mx-auto xl:mx-0" />
          <p className="text-mobileSm xl:pl-5 xl:text-sm">Home</p>
        </div>
        <div className="xl:sidebarComponent smallSidebarComponent">
          <SearchCircleIcon className="w-10 p-2 mx-auto xl:mx-0" />
          <p className="text-mobileSm xl:pl-5 xl:text-sm">Explore</p>
        </div>
        <div className="xl:sidebarComponent smallSidebarComponent">
          <CollectionIcon className="w-10 p-2 mx-auto xl:mx-0" />
          <p className="text-mobileSm xl:pl-5 xl:text-sm">Subscriptions</p>
        </div>
        <div className="border-b w-16 xl:w-56 pt-4 border-gray-700" />
      </div>
    </div>
  );
}

export default Sidebar;
