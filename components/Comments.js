import { useState } from "react";
import Image from "next/image";
import {
  ThumbUpIcon as ThumbUpOutline,
  ThumbDownIcon as ThumbDownOutline,
} from "@heroicons/react/outline";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

function Comments({
  profileImageUrl,
  authorDisplayName,
  likeCount,
  publishedAt,
  textDisplay,
}) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [textSnippet, setTextSnippet] = useState(false);
  const [readShow, setReadShow] = useState("Read more");
  const date = new Date(publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];
  console.log("COMMENT LENGTH ", textDisplay.length);

  const showMore = () => {
    if (textSnippet === false) {
      setTextSnippet(true);
    } else if (textSnippet === true) {
      setTextSnippet(false);
    }
    if (readShow === "Read more") {
      setReadShow("Show less");
    } else if (readShow === "Show less") {
      setReadShow("Read more");
    }
  };

  // if (textDisplay.length > 10) {
  //   setTextDisplaySnippet(textDisplay.substring(0, 10) + "...");
  // } else {
  //   setTextDisplaySnippet(textDisplay);
  // }

  const handleLikeClick = () => {
    if (liked === false) {
      setLiked(true);
      setDisliked(false);
    } else if (liked === true) {
      setLiked(false);
    }
  };

  const handleDisikeClick = () => {
    if (disliked === false) {
      setDisliked(true);
      setLiked(false);
    } else if (disliked === true) {
      setDisliked(false);
    }
  };
  return (
    <div className="text-left py-3 flex w-11/12">
      <div>
        <Image
          src={profileImageUrl}
          width={35}
          height={35}
          className="rounded-full items-center"
        />
      </div>
      <div>
        <div className="flex pl-5">
          <div>
            <div className="flex items-center pb-2">
              <h2 className="text-white font-semibold text-mobileSm8 sm:text-sm">
                {authorDisplayName}
              </h2>
              <p className="text-gray-400 text-mobileSm sm:text-xs pl-2 pt-0.5">
                {month + " " + day + ", " + year}
              </p>
            </div>
            {textDisplay.length > 300 ? (
              <>
                <p className="text-white text-mobileSm sm:text-sm">
                  {textSnippet === false
                    ? textDisplay.substring(0, 300) + "..."
                    : textDisplay}
                </p>

                <p
                  className="text-gray-400 hover:underline cursor-pointer text-mobileSm sm:text-base"
                  onClick={showMore}
                >
                  {readShow}
                </p>
              </>
            ) : (
              <p className="text-white text-mobileSm sm:text-sm">
                {textDisplay}
              </p>
            )}
            {/* <p className="text-white text-mobileSm sm:text-sm">
              {textDisplaySnippet.length > 10
                ? textDisplaySnippet.substring(0, 10) + "..."
                : textDisplaySnippet}
              {textDisplay.length > 10 ? (
                <p
                  className="text-gray-400 hover:underline cursor-pointer"
                  onClick={showMore}
                >
                  Read more
                </p>
              ) : null}
            </p> */}
          </div>
        </div>

        <div className="flex pl-5">
          <div className="pt-3 flex">
            {liked ? (
              <ThumbUpIcon
                className="w-3 sm:w-5  text-white cursor-pointer"
                onClick={handleLikeClick}
              />
            ) : (
              <ThumbUpOutline
                className="w-3 sm:w-5  text-white cursor-pointer"
                onClick={handleLikeClick}
              />
            )}
            <p className="text-gray-400  text-mobileSm sm:text-xs  flex items-center pl-2">
              {likeCount}
            </p>
          </div>
          <div className="pt-3 pl-4">
            {disliked ? (
              <ThumbDownIcon
                className="w-3 sm:w-5  text-white cursor-pointer"
                onClick={handleDisikeClick}
              />
            ) : (
              <ThumbDownOutline
                className="w-3 sm:w-5  text-white cursor-pointer"
                onClick={handleDisikeClick}
              />
            )}
          </div>
          <p className="items-bottom pt-3 pl-4 text-gray-400 text-mobileSm sm:text-xs cursor-pointer">
            REPLY
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comments;
