import Image from "next/image";
import { useRouter } from "next/dist/client/router";

function VideoThumbnail({
  id,
  thumbnail,
  title,
  description,
  channelTitle,
  thumbnailWidth,
  thumbnailHeight,
  commentCount,
  dislikeCount,
  likeCount,
  viewCount,
  publishedAt,
  embedHtml,
}) {
  const router = useRouter();

  const descriptionSnippet = description.substring(0, 150) + "...";

  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/videoPage",
          query: {
            id: id,
            title: title,
            viewCount: viewCount,
            commentCount: commentCount,
            dislikeCount: dislikeCount,
            likeCount: likeCount,
            publishedAt: publishedAt,
            embedHtml: embedHtml,
          },
        });
      }}
      className="w-full flex cursor-pointer hover:scale-105 transition duration-200 ease-out active:scale-90"
    >
      <div className="py-2">
        <Image
          src={thumbnail}
          width={thumbnailWidth}
          height={thumbnailHeight}
        />
      </div>
      <div className="text-left ml-4 mt-3">
        <h1 className="text-white text-lg">{title}</h1>
        <p className="text-gray-400 text-xs pb-2">{channelTitle}</p>
        <p className="text-gray-400 text-xs">{descriptionSnippet}</p>
      </div>
    </div>
  );
}

export default VideoThumbnail;
