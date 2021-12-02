import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { doc, setDoc, getFirestore } from "firebase/firestore";

function SuggestionsThumbnail({
  id,
  title,
  thumbnail,
  thumbnailWidth,
  thumbnailHeight,
  channelTitle,
  viewCount,
  publishedAt,
}) {
  // const titleSnippet = "";
  // title !== null && titleSnippet === title.substring(0, 50) + "...";
  const router = useRouter();
  let today = new Date();

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
        setDoc(doc(db, user.uid, id), {
          userId: user.uid,
          videoId: id,
          thumbnail: thumbnail,
          title: title,
          channelTitle: channelTitle,
          viewCount: viewCount,
          publishedAt: publishedAt,
          date: today,
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
