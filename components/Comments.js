import { useState } from "react";

import {
  ThumbUpIcon as ThumbUpOutline,
  ThumbDownIcon as ThumbDownOutline,
} from "@heroicons/react/outline";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

function Comments() {
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
    <div className="min-h-6/12 text-left border-t border-gray-700 pt-5">
      <h2 className="text-white font-semibold pb-5">1,495 Comments</h2>
      <div className="flex items-center pb-2">
        <h2 className="text-white font-semibold text-sm">User name</h2>
        <p className="text-gray-400 text-xs pl-2 pt-0.5">3 months ago</p>
      </div>
      <p className="text-white text-sm">
        This is the comment that will be in there you stupid butt butt
      </p>
      <div className="flex">
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
          <p className="text-gray-400 text-xs flex items-center pl-2">3.5k</p>
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
  );
}

export default Comments;
