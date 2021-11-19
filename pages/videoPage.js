import { useState } from "react";
import YouTube from "react-youtube";
import { useRouter } from "next/dist/client/router";
import { Header, Suggestions } from "../components/index";
import {
  ThumbUpIcon as ThumbUpOutline,
  ThumbDownIcon as ThumbDownOutline,
  ShareIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

function videoPage() {
  const router = useRouter();
  const {
    id,
    title,
    viewCount,
    dislikeCount,
    likeCount,
    publishedAt,
    embedHtml,
    commentCount,
  } = router.query;
  console.log("embedded", embedHtml);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const date = new Date(publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];
  const formattedViewCount = Number(viewCount).toLocaleString();

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

  // const formattedDate = format(date, "MMMM do, yyyy");
  return (
    <div className="bg-black-medium min-h-screen ">
      <Header />
      <div className="flex ">
        <main className="items-center justify-center w-full pl-5 pt-5 text-center overflow-scroll">
          <div>
            <div
              className="aspect-w-14 aspect-h-7"
              dangerouslySetInnerHTML={{ __html: `${embedHtml}` }}
            />
          </div>
          <div className="grid grid-cols-2 h-24 pb-10  border-b border-gray-700">
            <div className="pt-4 text-left">
              <h2 className="text-white text-xl pb-3">{title}</h2>
              <p className="text-sm text-gray-400">
                {formattedViewCount} views · {month + " " + day + ", " + year}
              </p>
            </div>
            <div className="flex text-white items-end justify-end">
              <p className="flex text-sm font-semibold items-center">
                {liked ? (
                  <ThumbUpIcon
                    onClick={handleLikeClick}
                    className="w-8 pr-2 cursor-pointer"
                  />
                ) : (
                  <ThumbUpOutline
                    onClick={handleLikeClick}
                    className="w-8 pr-2 cursor-pointer"
                  />
                )}

                {likeCount}
              </p>
              <p className="flex pl-4 text-sm font-semibold items-center">
                {disliked ? (
                  <ThumbDownIcon
                    onClick={handleDisikeClick}
                    className="w-8 pr-2 cursor-pointer"
                  />
                ) : (
                  <ThumbDownOutline
                    onClick={handleDisikeClick}
                    className="w-8 pr-2 cursor-pointer"
                  />
                )}
                {dislikeCount}
              </p>
              <p className="flex pl-4 text-sm font-semibold items-center">
                <ShareIcon className="w-8 pr-2" /> SHARE
              </p>
              <p className="flex pl-4 text-sm font-semibold items-center">
                <SaveIcon className="w-8 pr-2 item-top" /> SAVE
              </p>
            </div>
          </div>
        </main>
        <Suggestions />
      </div>
    </div>
  );
}

export default videoPage;
