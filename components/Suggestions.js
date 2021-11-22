import { useRouter } from "next/dist/client/router";
import { SuggestionsThumbnail } from "../components/index";

function Suggestions({ data }) {
  const titleText =
    "test text hello hyeeeeh fdslahfdsahfliudhaklfdhslkajfdhsalfhdahfdjkhazljfhdljahfjkahdfklh";
  const titleSnippet = titleText.substring(0, 30) + "...";
  console.log("data from suggestions page", data);
  return (
    <div className="w-suggestionWidth min-h-screen pr-10 hidden md:inline-flex lg:inline-flex xl:inline-flex 2xl:inline-flex">
      <SuggestionsThumbnail
        title={titleSnippet}
        thumbnail="https://campaigndonut.com/wp-content/uploads/2019/05/justin-brown-youtub-thumbnails.jpg"
        channelTitle="Test Title"
        viewCount="601k views"
      />
      {/* {data.items?.map((item) => {
        <SuggestionsThumbnail
          title={item.snippet.title}
          thumbnail={item.snippet.thumbnails.medium.url}
          channelTitle={item.snippet.channelTitle}
          viewCount={item.statistics.viewCount}
        />;
      })} */}
    </div>
  );
}

export default Suggestions;
