import Head from "next/head";

import { Header, Sidebar, VideoThumbnail } from "../components/index";

export default function Home({ data }) {
  return (
    <div className=" bg-black-medium min-h-screen">
      <Head>
        <title>YouTube</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex">
        <div className="h-screen sticky top-0">
          <Sidebar />
        </div>

        <main className="flex-grow mt-4 pr-5d pl-5 md:pl-24 overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {!data.error ? (
            data.items?.map((item) => (
              <VideoThumbnail
                key={item.id}
                id={item.id}
                thumbnail={item.snippet.thumbnails.medium.url}
                thumbnailWidth={item.snippet.thumbnails.medium.width}
                thumbnailHeight={item.snippet.thumbnails.medium.height}
                description={item.snippet.description}
                channelTitle={item.snippet.channelTitle}
                title={item.snippet.title}
                commentCount={item.statistics.commentCount}
                dislikeCount={item.statistics.dislikeCount}
                likeCount={item.statistics.likeCount}
                viewCount={Number(item.statistics.viewCount).toLocaleString()}
                publishedAt={item.snippet.publishedAt}
                embedHtml={item.player.embedHtml}
              />
            ))
          ) : (
            <p className="text-white">
              API Limit Reached. Cannot retrieve videos.
            </p>
          )}
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?&part=player&part=statistics&part=id&part=snippet&chart=mostPopular&maxResults=48&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
