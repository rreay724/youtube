import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import { Header, Sidebar, SearchThumbnail } from "../components/index";

export default function searchPage({ data }) {
  const router = useRouter();
  const { searchInput } = router.query;
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

        <main className="items-center justify-center w-full px-10 md:px-20 text-center overflow-y-scroll ml-10 sm:ml-20 md:ml-10 lg:ml-16 xl:ml-56">
          <section className="mt-5 lg:mt-10">
            {data.items?.map((item) => (
              <SearchThumbnail
                key={item.id.videoId}
                id={item.id.videoId}
                thumbnail={item.snippet.thumbnails.medium.url}
                thumbnailWidth={item.snippet.thumbnails.medium.width}
                thumbnailHeight={item.snippet.thumbnails.medium.height}
                description={item.snippet.description}
                channelTitle={item.snippet.channelTitle}
                title={item.snippet.title}
                publishedAt={item.snippet.publishedAt}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { searchInput } = context.query;

  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${searchInput}&type=video&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
