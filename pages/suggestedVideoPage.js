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

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [readShow, setReadShow] = useState("SHOW MORE");
  const [textSnippet, setTextSnippet] = useState(false);
  const date = new Date(data.items[0]?.snippet.publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];
  const formattedViewCount = Number(
    data.items[0]?.statistics.viewCount
  ).toLocaleString();

  let viewInt = parseInt(data.items[0]?.statistics.viewCount.replace(/,/g, ""));

  const showMore = () => {
    if (textSnippet === false) {
      setTextSnippet(true);
    } else if (textSnippet === true) {
      setTextSnippet(false);
    }
    if (readShow === "SHOW MORE") {
      setReadShow("SHOW LESS");
    } else if (readShow === "SHOW LESS") {
      setReadShow("SHOW MORE");
    }
  };

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

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
        <main className="items-center justify-center w-full pl-5 pt-5 text-center overflow-scroll scrollbar-hide">
          <div>
            <div
              className="aspect-w-14 aspect-h-7"
              dangerouslySetInnerHTML={{
                __html: `${data.items[0]?.player.embedHtml}`,
              }}
            />
          </div>
          <div className="h-18 sm:h-24 pb-2 lg:pb-20">
            <div className="pt-2 sm:pt-4 text-left">
              <h2 className="text-white sm:text-xl pb-3 w-full text-mobileSm">
                {data.items[0]?.snippet.title}
              </h2>
            </div>
            <div className="flex text-white items-center justify-end sm:mr-10 lg:mr-0 w-full ">
              <p className="text-mobileSm8 sm:text-sm text-gray-400 w-full text-left">
                {numFormatter(viewInt)} views ·{" "}
                {month + " " + day + ", " + year}
              </p>
              <p className="flex items-center text-mobileSm sm:text-sm">
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

                {data.items[0]?.statistics.likeCount}
              </p>
              <p className="flex pl-4 text-sm items-center text-mobileSm sm:text-sm">
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
                {data.items[0]?.statistics.dislikeCount}
              </p>
              <p className="flex pl-4 items-center cursor-pointer text-mobileSm sm:text-sm">
                <ShareIcon className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer" />
                SHARE
              </p>
              <p className="flex pl-4 items-center cursor-pointer text-mobileSm sm:text-sm">
                <SaveIcon className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer item-top" />
                SAVE
              </p>
            </div>
          </div>
          <div className="border-b border-gray-700" />
          <div className="text-white text-left py-5 w-8/12">
            <h3 className="font-semibold text-sm">
              {data.items[0]?.snippet.channelTitle}
            </h3>
            {data.items[0]?.snippet.description.length > 700 ? (
              <>
                <p className="pt-4 text-xs">
                  {textSnippet === false
                    ? data.items[0]?.snippet.description.substring(0, 700) +
                      "..."
                    : data.items[0]?.snippet.description}
                </p>
                <p
                  className="text-gray-400 cursor-pointer text-mobileSm sm:text-xs pt-2"
                  onClick={showMore}
                >
                  {readShow}
                </p>
              </>
            ) : (
              <p className="pt-4 text-xs">
                {data.items[0]?.snippet.description}
              </p>
            )}
          </div>
          <div className="border-b border-gray-700" />

          <div>
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
