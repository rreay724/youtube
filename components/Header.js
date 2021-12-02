import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { SearchIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import { app } from "../firebase";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
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
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      setPhotoURL(user.photoURL);
      // ...
    } else {
      // User is signed out
      // ...
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

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-black-light  items-center">
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
          className="text-gray-300 flex-grow pl-2 bg-black-medium outline-none text-lg placeholder-gray-500 h-9 "
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
            <Image
              src={photoURL}
              width={30}
              height={30}
              className="rounded-full"
            />
          </div>
        ) : (
          <UserCircleIcon
            className="h-14 py-3 cursor-pointer inline-flex sticky md:mx-2 text-white"
            onClick={login}
          />
        )}
      </div>
    </header>
  );
}

export default Header;
