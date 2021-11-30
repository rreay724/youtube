import { SuggestionsThumbnail } from "../components/index";

function Suggestions({ data }) {
  console.log("SUGGESTIONS", data);
  return (
    <div className="w-suggestionWidth min-h-screen pr-10 hidden lg:inline-block">
      {!data.error ? (
        data.items.map((item) => (
          <SuggestionsThumbnail
            key={item.id.videoId}
            id={item.id.videoId}
            title={item.snippet?.title}
            thumbnail={item.snippet?.thumbnails.medium.url}
            channelTitle={item.snippet?.channelTitle}
          />
        ))
      ) : (
        <p className="text-white pl-14 pt-10">
          API Limit Reached. Cannot display suggestions
        </p>
      )}
    </div>
  );
}

export default Suggestions;
