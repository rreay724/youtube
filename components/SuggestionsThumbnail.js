import Image from "next/image";
import { useRouter } from "next/dist/client/router";

function SuggestionsThumbnail({
  id,
  title,
  thumbnail,
  thumbnailWidth,
  thumbnailHeight,
  channelTitle,
  viewCount,
}) {
  // const titleSnippet = "";
  // title !== null && titleSnippet === title.substring(0, 50) + "...";
  const router = useRouter();

  return (
    <div
      className="flex pl-5 cursor-pointer items-top pb-0.5"
      onClick={() => {
        router.push({
          pathname: "/suggestedVideoPage",
          query: {
            id: id,
          },
        });
      }}
    >
      <div className="flex-none">
        {thumbnail ? <Image src={thumbnail} width={190} height={116} /> : null}
      </div>
      <div className="pl-2">
        <h2 className="text-white overflow-x-auto text-sm font-semibold">
          {title}
        </h2>
        <div className="pt-1">
          <p className="text-xs text-gray-400">{channelTitle}</p>
          {/* <p className="text-xs text-gray-400">{viewCount} views</p> */}
        </div>
      </div>
    </div>
  );
}

export default SuggestionsThumbnail;
