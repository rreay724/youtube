import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

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
  async function handleClick() {
    const auth = getAuth();
    const user = auth.currentUser;
    router.push({
      pathname: "/suggestedVideoPage",
      query: {
        id: id,
      },
    });

    if (user) {
      const data = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&part=player&id=${id}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      ).then((res) => res.json());
      const db = getFirestore();
      console.log(data);

      setDoc(doc(db, user.uid, "history", "videos", id), {
        userId: user.uid,
        videoId: data.items[0].id,
        thumbnail: data.items[0].snippet.thumbnails.medium.url,
        title: data.items[0].snippet.title,
        channelTitle: data.items[0].snippet.channelTitle,
        viewCount: data.items[0].statistics.viewCount,
        publishedAt: data.items[0].snippet.publishedAt,
        date: today,
        thumbnailWidth: data.items[0].snippet.thumbnails.medium.width,
        thumbnailHeight: data.items[0].snippet.thumbnails.medium.height,
        description: data.items[0].snippet.description,
      });
    }
  }

  return (
    <div
      className="flex pl-5 cursor-pointer items-top pb-0.5"
      onClick={handleClick}
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
