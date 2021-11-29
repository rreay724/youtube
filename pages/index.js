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
        <Sidebar />

        <main className="items-center justify-center w-full px-20 text-center overflow-scroll">
          <section className="mt-10">
            {data.items?.map((item) => (
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
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?&part=player&part=statistics&part=id&part=snippet&chart=mostPopular&maxResults=50&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
