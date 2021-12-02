import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { SearchIcon } from "@heroicons/react/outline";
import { UserCircleIcon, LogoutIcon } from "@heroicons/react/outline";
import { app } from "../firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

function Header() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  // firebase
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const user = auth.currentUser;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setPhotoURL(user.photoURL);
    }
  });

  console.log("USER", user);

  const handleSearch = () => {
    router.push({
      pathname: "/searchPage",
      query: {
        searchInput: searchInput,
      },
    });
  };

  const login = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        router.reload(window.location.pathname);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-black-light  items-center pt-2">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="relative flex items-center h-14 cursor-pointer my-auto pl-5"
      >
        <Image
          src="/YouTube-Logo.png"
          width={90}
          height={30}
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      <div className="flex items-center md:shadow-sm h-8 border border-black-medium bg-black-superLight">
        <input
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          value={searchInput}
          type="text"
          //   placeholder={placeholder ? placeholder : "Start your search"}
          className="text-gray-300 flex-grow pl-2 bg-black-medium outline-none text-lg placeholder-gray-500 h-9 w-12"
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
      <div className="text-right pr-4">
        {user ? (
          <div className="h-14 py-3 cursor-pointer inline-flex sticky md:mx-2 rounded-full">
            {photoURL ? (
              <>
                <LogoutIcon
                  className="h-10 cursor-pointer  inline-flex px-7 pb-2 text-gray-400"
                  onClick={logout}
                />

                <Image
                  width={30}
                  height={30}
                  className="rounded-full"
                  placeholder="empty"
                  blurDataURL="https://image-component.nextjs.gallery/placeholder"
                  src={photoURL}
                />
              </>
            ) : null}
          </div>
        ) : (
          <div
            className=" inline-flex sticky items-center pr-3 border border-blue-500 h-10 text-blue-500 cursor-pointer"
            onClick={login}
          >
            <UserCircleIcon className="h-12 py-3 cursor-pointer  md:mx-2" />
            <p>SIGN IN</p>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
