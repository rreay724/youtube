import YouTube from "react-youtube";
import { useRouter } from "next/dist/client/router";
import { Header, Sidebar } from "../components/index";

function videoPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <YouTube videoId={id} />
      </div>
    </div>
  );
}

export default videoPage;
