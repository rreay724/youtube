import Head from "next/head";
import { Header, Player } from "../components/index";
import { API_KEY } from "../keys";

export default function Home({ data }) {
  console.log(data?.items);
  return (
    <div>
      <Head>
        <title>YouTube</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {data.items?.map(({ id }) => (
        <Player id={id} />
      ))}

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"></main>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&part=player&part=id&chart=mostPopular&key=${API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      data,
    },
  };
}
