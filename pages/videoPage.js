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
    commentCount,
    dislikeCount,
    likeCount,
    publishedAt,
    embedHtml,
  } = router.query;
  const date = new Date(publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];
  const formattedViewCount = Number(viewCount).toLocaleString();

  const handleLikeClick = () => {};

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
          <div className="grid grid-cols-2">
            <div className="pt-4 text-left">
              <h2 className="text-white text-xl pb-3">{title}</h2>
              <p className="text-sm text-gray-400">
                {formattedViewCount} views · {month + " " + day + ", " + year}
              </p>
            </div>
            <div className="flex text-white items-end justify-end">
              <p className="flex text-sm font-semibold items-center">
                <ThumbUpOutline className="w-8 pr-2" /> {likeCount}
              </p>
              <p className="flex pl-4 text-sm font-semibold items-center">
                <ThumbDownOutline className="w-8 pr-2" /> {dislikeCount}
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
