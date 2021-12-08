import Head from "next/head";
import { useRouter } from "next/dist/client/router";

import { Header, Sidebar, SearchThumbnail } from "../components/index";

export default function searchPage({ data }) {
  const router = useRouter();
  const { searchInput, userId } = router.query;
  console.log(data);

  return (
    <div className=" bg-black-medium min-h-screen">
      <Head>
        <title>YouTube</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex h-screen">
        <div className="sticky inset-y-0">
          <Sidebar />
        </div>

        <main className="items-center justify-center w-full pl-5 text-center overflow-y-scroll">
          <section className="mt-5">
            {!data.error ? (
              data.items?.map((item) => (
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
                  channelId={item.snippet.channelId}
                  userId={userId}
                />
              ))
            ) : (
              <p className="text-white">
                API Limit Reached. Cannot retrieve videos.
              </p>
            )}
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
