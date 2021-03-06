import Image from "next/image";
import { useRouter } from "next/dist/client/router";

function HistoryThumbnail({
  id,
  thumbnail,
  title,
  description,
  channelTitle,
  thumbnailWidth,
  thumbnailHeight,
  publishedAt,
  commentCount,
  likeCount,
  viewCount,
  embedHtml,
  channelId,
  user,
}) {
  const router = useRouter();

  const descriptionSnippet = description.substring(0, 150) + "...";
  let today = new Date();

  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/historyVideoPage",
          query: {
            id: id,
            thumbnail: thumbnail,
            title: title,
            channelTitle: channelTitle,
            channelId: channelId,
            viewCount: viewCount,
            publishedAt: publishedAt,
            date: today,
            thumbnailWidth: thumbnailWidth,
            thumbnailHeight: thumbnailHeight,
            description: description,
            commentCount: commentCount,
            likeCount: likeCount,
            viewCount: viewCount,
            embedHtml: embedHtml,
            user: user,
          },
        });
      }}
      className="w-full flex cursor-pointer  transition duration-200 ease-out active:bg-black-superLight"
    >
      <div className="py-2 flex-none w-44 md:w-64">
        <Image
          src={thumbnail}
          width={thumbnailWidth}
          height={thumbnailHeight}
        />
      </div>
      <div className="text-left ml-2 md:ml-4 mt-3 md:w-8/12 w-12/12">
        <h1 className="text-white text-mobileXs md:text-lg">{title}</h1>
        <p className="text-gray-400 text-mobileXs md:text-xs  pb-4">
          {channelTitle}
        </p>
        <p className="text-gray-400 text-mobileXs md:text-xs ">
          {descriptionSnippet}
        </p>
      </div>
    </div>
  );
}

export default HistoryThumbnail;
