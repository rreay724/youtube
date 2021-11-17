import YouTube from "react-youtube";
import { useRouter } from "next/dist/client/router";

function videoPage() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <YouTube videoId={id} />
    </div>
  );
}

export default videoPage;
