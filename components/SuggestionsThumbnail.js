import Image from "next/image";
import { useState } from "react";
function SuggestionsThumbnail({
  title,
  thumbnail,
  thumbnailWidth,
  thumbnailHeight,
  channelTitle,
  viewCount,
}) {
  const titleSnippet = title.substring(0, 50) + "...";

  return (
    <div className="flex pl-5 pt-5 cursor-pointer">
      <div className="w-52">
        <Image src={thumbnail} width={190} height={116} />
      </div>
      <div className="pl-2">
        <h2 className="text-white overflow-x-auto">{titleSnippet}</h2>
        <div className="pt-1">
          <p className="text-xs text-gray-400">{channelTitle}</p>
          {/* <p className="text-xs text-gray-400">{viewCount} views</p> */}
        </div>
      </div>
    </div>
  );
}

export default SuggestionsThumbnail;
