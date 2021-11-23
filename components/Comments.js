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
    <div className="text-left py-3 flex">
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
              <h2 className="text-white font-semibold text-sm">
                {authorDisplayName}
              </h2>
              <p className="text-gray-400 text-xs pl-2 pt-0.5">{publishedAt}</p>
            </div>
            <p className="text-white text-sm">{textDisplay}</p>
          </div>
        </div>

        <div className="flex pl-5">
          <div className="pt-3 flex">
            {liked ? (
              <ThumbUpIcon
                className="w-5 text-white cursor-pointer"
                onClick={handleLikeClick}
              />
            ) : (
              <ThumbUpOutline
                className="w-5 text-white cursor-pointer"
                onClick={handleLikeClick}
              />
            )}
            <p className="text-gray-400 text-xs flex items-center pl-2">
              {likeCount}
            </p>
          </div>
          <div className="pt-3 pl-4">
            {disliked ? (
              <ThumbDownIcon
                className="w-5 text-white cursor-pointer"
                onClick={handleDisikeClick}
              />
            ) : (
              <ThumbDownOutline
                className="w-5 text-white cursor-pointer"
                onClick={handleDisikeClick}
              />
            )}
          </div>
          <p className="items-bottom pt-3 pl-4 text-gray-400 text-xs cursor-pointer">
            REPLY
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comments;
