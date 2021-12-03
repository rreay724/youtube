import { useState } from "react";
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

export default function historyPage({ historyData }) {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  const router = useRouter();
  const { user } = router.query;

  console.log("historyData", historyData);

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

historyPage.getInitialProps = async () => {
  const db = getFirestore();
  let historyData = [];

  const querySnapshot = await getDocs(
    collection(db, "HUPnQh5mlbM6JfilLPys0XZHVXR2")
  );
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    historyData.push(doc.data());
  });

  console.log(historyData);

  return { historyData: historyData };
};
