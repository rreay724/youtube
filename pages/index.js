import Head from "next/head";

import { Header, Player, Sidebar, VideoThumbnail } from "../components/index";

export default function Home({ data }) {
  console.log(data);

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
    `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=player&part=id&part=snippet&chart=mostPopular&maxResults=20&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
