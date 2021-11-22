import Image from "next/image";
function SuggestionsThumbnail({
  title,
  thumbnail,
  thumbnailWidth,
  thumbnailHeight,
  channelTitle,
  viewCount,
}) {
  const titleSnippet = title.substring(0, 30) + "...";
  return (
    <div className="flex pl-5 pt-5">
      <div className="w-52">
        <Image src={thumbnail} width={190} height={116} />
      </div>
      <div className="">
        <h2 className="text-white">{titleSnippet}</h2>
        <div className="pt-1">
          <p className="text-xs text-gray-400">{channelTitle}</p>
          <p className="text-xs text-gray-400">{viewCount} views</p>
        </div>
      </div>
    </div>
  );
}

export default SuggestionsThumbnail;
