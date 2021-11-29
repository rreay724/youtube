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
  const date = new Date(publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];

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
      className="flex cursor-pointer transition duration-200 ease-out active:bg-black-superLight"
    >
      <div className="py-2">
        <Image
          src={thumbnail}
          width={thumbnailWidth}
          height={thumbnailHeight}
        />
      </div>
      <div className="text-left ml-4 mt-3 w-8/12 ">
        <h1 className="text-white text-lg">{title}</h1>
        <p className="text-gray-400 text-xs pt-1">
          {channelTitle} · {viewCount} views · {month + " " + day + ", " + year}
        </p>
        <p className="text-gray-400 text-xs pb-4"></p>
        <p className="text-gray-400 text-xs overflow-auto">
          {descriptionSnippet}
        </p>
      </div>
    </div>
  );
}

export default VideoThumbnail;
