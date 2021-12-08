import { useRouter } from "next/dist/client/router";
import {
  HomeIcon,
  CollectionIcon,
  SearchCircleIcon,
  ClockIcon,
  BookmarkIcon,
} from "@heroicons/react/outline";

import { getAuth } from "firebase/auth";

function Sidebar() {
  const router = useRouter();

  const handleHistoryClick = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      router.push({
        pathname: "/historyPage",
        query: { user: user.uid },
      });
    }
  };

  const handleSaved = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      router.push({
        pathname: "/savedPage",
        query: { user: user.uid },
      });
    }
  };

  return (
    <div
      className=" pt-2 xl:w-64 bg-black-light hidden sm:inline-block md:inline-block 
    lg:inline-block xl:inline-block 2xl:inline-block min-h-screen "
    >
      <div className="w-full">
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
      <div className="w-full pt-4">
        <div
          className="xl:sidebarComponent smallSidebarComponent"
          onClick={handleHistoryClick}
        >
          <ClockIcon className="w-10 p-2 mx-auto xl:mx-0" />
          <p className="text-mobileSm xl:pl-5 xl:text-sm">History</p>
        </div>
        <div
          className="xl:sidebarComponent smallSidebarComponent"
          onClick={handleSaved}
        >
          <BookmarkIcon className="w-10 p-2 mx-auto xl:mx-0" />
          <p className="text-mobileSm xl:pl-5 xl:text-sm">Saved</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
