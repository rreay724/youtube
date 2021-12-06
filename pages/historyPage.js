import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/dist/client/router";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { Header, Sidebar, SearchThumbnail } from "../components/index";

export default function historyPage({ historyJson }) {
  const router = useRouter();
  const { user } = router.query;
  const historyData = JSON.parse(historyJson);

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
            {historyData?.map((item) => (
              <SearchThumbnail
                key={item?.videoId}
                id={item?.videoId}
                thumbnail={item?.thumbnail}
                thumbnailWidth={item.thumbnailWidth}
                thumbnailHeight={item.thumbnailHeight}
                description={item.description}
                channelTitle={item?.channelTitle}
                title={item?.title}
                publishedAt={item?.publishedAt}
              />
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { user } = context.query;
  const db = getFirestore();
  let historyData = [];

  const querySnapshot = await getDocs(collection(db, user));
  querySnapshot.forEach((doc) => {
    historyData.push(doc.data());
  });
  const historyJson = JSON.stringify(historyData);

  return { props: { historyJson } };
}
