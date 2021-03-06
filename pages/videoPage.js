import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Header, Suggestions, CommentSection } from "../components/index";
import {
  ThumbUpIcon as ThumbUpOutline,
  ThumbDownIcon as ThumbDownOutline,
  ShareIcon,
  SaveIcon,
} from "@heroicons/react/outline";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";
import {
  doc,
  setDoc,
  getFirestore,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Notes: needs description, subscriber counts, channel image, show more, show less for descrption, bell icon and subscribe button

function videoPage({ data, comments, subExists, className, subscribeText }) {
  const router = useRouter();
  const db = getFirestore();

  const {
    id,
    userId,
    thumbnail,
    title,
    description,
    channelTitle,
    thumbnailWidth,
    thumbnailHeight,
    commentCount,
    likeCount,
    viewCount,
    publishedAt,
    embedHtml,
    channelId,
  } = router.query;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [readShow, setReadShow] = useState("SHOW MORE");
  const [textSnippet, setTextSnippet] = useState(false);
  const [subscribe, setSubscribe] = useState(subscribeText);
  const [subscribed, setSubscribed] = useState(subExists);
  const [subscribeClassName, setSubscribeClassName] = useState(className);

  const date = new Date(publishedAt);
  const month = date.toString().split(" ")[1];
  const day = date.toString().split(" ")[2];
  const year = date.toString().split(" ")[3];

  let viewInt = parseInt(viewCount.replace(/,/g, ""));
  let likeInt = parseInt(likeCount.replace(/,/g, ""));

  async function saveClick() {
    if (userId) {
      await setDoc(doc(db, userId, "savedVideos", "videos", id), {
        id: id,
        thumbnail: thumbnail,
        thumbnailWidth: thumbnailWidth,
        thumbnailHeight: thumbnailHeight,
        description: description,
        channelTitle: channelTitle,
        title: title,
        commentCount: commentCount,
        likeCount: likeCount,
        viewCount: viewCount,
        publishedAt: publishedAt,
        embedHtml: embedHtml,
        channelId: channelId,
        user: userId,
      });
      const notify = () => {
        toast("Video saved", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      };

      notify();
    }
  }

  const showMore = () => {
    if (textSnippet === false) {
      setTextSnippet(true);
    } else if (textSnippet === true) {
      setTextSnippet(false);
    }
    if (readShow === "SHOW MORE") {
      setReadShow("SHOW LESS");
    } else if (readShow === "SHOW LESS") {
      setReadShow("SHOW MORE");
    }
  };

  // TODO:add toast message
  async function subscribeClick() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      if (subscribe === "SUBSCRIBE") {
        setSubscribe("SUBSCRIBED");
      } else if (subscribe === "SUBSCRIBED") {
        setSubscribe("SUBSCRIBE");
      }

      if (subExists === false) {
        setSubscribed(true);

        // firebase function to send channel title and id
        await setDoc(
          doc(db, user?.uid, "subscriptions", "channels", channelId),
          {
            channelId: channelId,
            channelTitle: channelTitle,
          }
        );
        setSubscribeClassName(
          "border border-black-superLight bg-black-superLight text-black-superDuperLight text-xs w-24 h-8 rounded-sm cursor-pointer"
        );
        router.reload(window.location.pathname);
      } else if (subExists === true) {
        setSubscribed(false);
        //firebase function to delete channel title and id
        await deleteDoc(
          doc(db, user?.uid, "subscriptions", "channels", channelId)
        );
        setSubscribeClassName(
          "border border-red-600 bg-red-600 text-white text-xs w-24 h-8 rounded-sm cursor-pointer"
        );
        router.reload(window.location.pathname);
      }
    } else {
      // add toast message here
    }
  }

  const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  };

  const handleLikeClick = () => {
    if (liked === false) {
      setLiked(true);
      setDisliked(false);
    } else if (liked === true) {
      setLiked(false);
    }
  };

  const handleDisikeClick = () => {
    if (disliked === false) {
      setDisliked(true);
      setLiked(false);
    } else if (disliked === true) {
      setDisliked(false);
    }
  };

  // const formattedDate = format(date, "MMMM do, yyyy");
  return (
    <div className="bg-black-medium min-h-screen">
      <Header />
      <div className="flex">
        <main className="items-center justify-center w-full px-5 lg:pr-0 pt-5 text-center overflow-scroll scrollbar-hide">
          <div>
            <div
              className="aspect-w-14 aspect-h-7"
              dangerouslySetInnerHTML={{ __html: `${embedHtml}` }}
            />
          </div>
          <div className="h-18 sm:h-24 pb-2 lg:pb-20">
            <div className="pt-2 sm:pt-4 text-left">
              <h2 className="text-white sm:text-xl pb-3 w-full text-mobileSm">
                {title}
              </h2>
            </div>
            <div className="flex text-white items-center justify-end sm:mr-10 lg:mr-0 w-full ">
              <p className="text-mobileSm8 sm:text-sm text-gray-400 w-full text-left">
                {numFormatter(viewInt)} views ??{" "}
                {month + " " + day + ", " + year}
              </p>
              <p className="flex items-center text-mobileSm sm:text-sm">
                {liked ? (
                  <ThumbUpIcon
                    onClick={handleLikeClick}
                    className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer"
                  />
                ) : (
                  <ThumbUpOutline
                    onClick={handleLikeClick}
                    className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer"
                  />
                )}

                {numFormatter(likeInt)}
              </p>
              <p className="flex pl-4 items-center text-mobileSm sm:text-sm">
                {disliked ? (
                  <ThumbDownIcon
                    onClick={handleDisikeClick}
                    className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer"
                  />
                ) : (
                  <ThumbDownOutline
                    onClick={handleDisikeClick}
                    className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer"
                  />
                )}
                DISLIKE
              </p>
              <p className="flex pl-4  items-center cursor-pointer text-mobileSm sm:text-sm">
                <ShareIcon className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer" />
                SHARE
              </p>
              <p
                className="flex pl-4 items-center cursor-pointer text-mobileSm sm:text-sm"
                onClick={saveClick}
              >
                <SaveIcon className="w-5 sm:w-8 pr-1 sm:pr-2 cursor-pointer item-top" />
                SAVE
              </p>
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
              />
            </div>
          </div>
          <div className="border-b border-gray-700" />
          <div className="text-white text-left py-5 w-full flex flex-col-2">
            <div className="w-8/12">
              <h3 className="font-semibold text-sm">{channelTitle}</h3>
              {description.length > 700 ? (
                <>
                  <p className="pt-4 text-xs">
                    {textSnippet === false
                      ? description.substring(0, 700) + "..."
                      : description}
                  </p>
                  <p
                    className="text-gray-400 cursor-pointer text-mobileSm sm:text-xs pt-2"
                    onClick={showMore}
                  >
                    {readShow}
                  </p>
                </>
              ) : (
                <p className="pt-4 text-xs">{description}</p>
              )}
            </div>
            <div className="w-6/12 text-right">
              <button className={subscribeClassName} onClick={subscribeClick}>
                {subscribe}
              </button>
            </div>
          </div>
          <div className="border-b border-gray-700" />
          <div>
            <CommentSection comments={comments} commentCount={commentCount} />
          </div>

          {/* <div className=" border-b border-gray-700 h-5" /> */}
        </main>
        <Suggestions data={data} />
      </div>
    </div>
  );
}

export default videoPage;

export async function getServerSideProps(context) {
  const db = getFirestore();
  const { id, channelId, userId } = context.query;

  let subExists = false;
  let className = "";
  let subscribeText = "";
  if (userId) {
    const docRef = doc(db, userId, "subscriptions", "channels", channelId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      subExists = true;
      subscribeText = "SUBSCRIBED";
      className =
        "border border-black-superLight bg-black-superLight text-black-superDuperLight text-xs w-24 h-8 rounded-sm cursor-pointer";
    } else {
      subExists = false;
      subscribeText = "SUBSCRIBE";
      className =
        "border border-red-600 bg-red-600 text-white text-xs w-24 h-8 rounded-sm cursor-pointer";
    }
  }

  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?relatedToVideoId=${id}&part=id&part=snippet&maxResults=50&type=video&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  const comments = await fetch(
    `https://youtube.googleapis.com/youtube/v3/commentThreads?videoId=${id}&maxResults=50&part=snippet&part=id&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
      comments,
      subExists,
      className,
      subscribeText,
    },
  };
}
