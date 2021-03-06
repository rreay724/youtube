import { SuggestionsThumbnail } from "../components/index";

function Suggestions({ data }) {
  return (
    <div className="w-suggestionWidth min-h-screen pr-10 hidden lg:inline-block pt-5">
      {!data.error ? (
        data.items.map((item) => (
          <SuggestionsThumbnail
            key={item.id.videoId}
            id={item.id.videoId}
            title={item.snippet?.title}
            thumbnail={item.snippet?.thumbnails.medium.url}
            channelTitle={item.snippet?.channelTitle}
            publishedAt={item.snippet?.publishedAt}
            channelId={item.snippet?.channelId}
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
