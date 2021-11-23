import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Header, Suggestions, CommentSection } from "../components/index";
import {
  ThumbUpIcon as ThumbUpOutline,
  ThumbDownIcon as ThumbDownOutline,
  ShareIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";

// Notes: needs description, subscriber counts, channel image, show more, show less for descrption, bell icon and subscribe button

function suggestedVideoPage({ data, comments, suggested }) {
  const router = useRouter();

  const { id } = router.query;
  console.log("id", id);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const date = new Date(data.item[0]?.snippet.publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];
  const formattedViewCount = Number(
    data.item[0]?.statistics.viewCount
  ).toLocaleString();

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
    <div className="bg-black-medium min-h-screen">
      <Header />
      <div className="flex">
        <main className="items-center justify-center w-full pl-5 pt-5 text-center overflow-scroll">
          <div>
            <div
              className="aspect-w-14 aspect-h-7"
              dangerouslySetInnerHTML={{
                __html: `${data.item[0]?.player.embedHtml}`,
              }}
            />
          </div>
          <div className="grid grid-cols-2 h-24 pb-20 ">
            <div className="pt-4 text-left">
              <h2 className="text-white text-xl pb-3 w-full">
                {data.item[0]?.snippet.title}
              </h2>
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

                {data.item[0]?.statistics.likeCount}
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
                {data.item[0]?.statistics.dislikeCount}
              </p>
              <p className="flex pl-4 text-sm font-semibold items-center cursor-pointer">
                <ShareIcon className="w-8 pr-2" /> SHARE
              </p>
              <p className="flex pl-4 text-sm font-semibold items-center cursor-pointer">
                <SaveIcon className="w-8 pr-2 item-top" /> SAVE
              </p>
            </div>
          </div>
          <div className="pt-5">
            <CommentSection comments={comments} />
          </div>
        </main>
        <Suggestions data={suggested} />
      </div>
    </div>
  );
}

export default suggestedVideoPage;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const suggested = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?relatedToVideoId=${id}&part=id&part=snippet&maxResults=50&type=video&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=player&id=${id}&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  const comments = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?videoId=${id}&maxResults=50&part=snippet&part=id&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
      comments,
      suggested,
    },
  };
}
