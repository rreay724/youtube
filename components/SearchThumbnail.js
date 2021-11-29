import Image from "next/image";
import { useRouter } from "next/dist/client/router";

function SearchThumbnail({
  id,
  thumbnail,
  title,
  description,
  channelTitle,
  thumbnailWidth,
  thumbnailHeight,
  publishedAt,
}) {
  const router = useRouter();

  const descriptionSnippet = description.substring(0, 150) + "...";

  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/searchVideoPage",
          query: {
            id: id,
          },
        });
      }}
      className="w-full flex cursor-pointer  transition duration-200 ease-out active:bg-black-superLight"
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
        <p className="text-gray-400 text-xs pb-4">{channelTitle}</p>
        <p className="text-gray-400 text-xs">{descriptionSnippet}</p>
      </div>
    </div>
  );
}

export default SearchThumbnail;
