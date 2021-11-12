import YouTube from "react-youtube";

function Player({ id }) {
  return (
    <div className="py-5">
      <YouTube videoId={id} />
    </div>
  );
}

export default Player;
