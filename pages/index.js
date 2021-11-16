import Head from "next/head";
import { Header, Player, Sidebar } from "../components/index";

export default function Home({ data }) {
  return (
    <div className=" bg-black-medium">
      <Head>
        <title>YouTube</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex flex-col items-center justify-center w-full px-20 text-center">
          <section>
            {data.items?.map(({ id }) => (
              <Player key={id} id={id} />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=player&part=id&chart=mostPopular&key=${process.env.NEXT_PUBLIC_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
