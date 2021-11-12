import YouTube from "react-youtube";

function Player({ id }) {
  return (
    <div>
      <YouTube videoId={id} />
    </div>
  );
}

export default Player;
