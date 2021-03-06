import Image from "next/image";
import { useRouter } from "next/dist/client/router";
import { doc, setDoc, getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";

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
  channelId,
}) {
  const router = useRouter();
  const descriptionSnippet = description.substring(0, 150) + "...";
  const date = new Date(publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];
  const db = getFirestore();
  let today = new Date();

  async function sendDoc() {
    const auth = getAuth();
    const user = auth.currentUser;
    await setDoc(doc(db, user?.uid, "history", "videos", id), {
      userId: user.uid,
      videoId: id,
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
    });
  }

  return (
    <div
      onClick={() => {
        const auth = getAuth();
        const user = auth.currentUser;
        router.push({
          pathname: "/videoPage",
          query: {
            id: id,
            title: title,
            thumbnail: thumbnail,
            viewCount: viewCount,
            commentCount: commentCount,
            likeCount: likeCount,
            publishedAt: publishedAt,
            embedHtml: embedHtml,
            channelTitle: channelTitle,
            description: description,
            channelId: channelId,
            userId: user?.uid,
            thumbnailWidth: thumbnailWidth,
            thumbnailHeight: thumbnailHeight,
            channelId: channelId,
          },
        });
        {
          user ? sendDoc() : null;
        }
      }}
      className="cursor-pointer transition duration-200 ease-out active:bg-black-superLight mx-auto ml-4 py-5"
    >
      <Image src={thumbnail} width={thumbnailWidth} height={thumbnailHeight} />
      <div className="w-80">
        <h1 className="text-white text-sm md:text-lg">{title}</h1>
        <p className="text-gray-400 text-sm md:text-xs pt-1">
          {channelTitle} ?? {viewCount} views ?? {month + " " + day + ", " + year}
        </p>
        <p className="text-gray-400 text-mobileXs md:text-xs pb-4"></p>
      </div>
    </div>
  );
}

export default VideoThumbnail;
