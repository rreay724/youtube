import { SuggestionsThumbnail } from "../components/index";

function Suggestions({ data }) {
  return (
    <div className="w-suggestionWidth min-h-screen pr-10">
      {data
        ? data.items.map((item) => (
            <SuggestionsThumbnail
              key={item.id.videoId}
              id={item.id.videoId}
              title={item.snippet?.title}
              thumbnail={item.snippet?.thumbnails.medium.url}
              channelTitle={item.snippet?.channelTitle}
            />
          ))
        : null}
    </div>
  );
}

export default Suggestions;
