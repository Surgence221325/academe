import { useState } from "react";
import { VideoRoom } from "./VideoRoom";

function VideoMain() {
  const [hasJoined, setHasJoined] = useState(false);
  return (
  <div className="VideoChat">
    <h1>Video Chat Test</h1>

    {!hasJoined && (
    <button onClick={() => setHasJoined(true)}>
      Join Room
      </button>
    )}

    {hasJoined && <VideoRoom />}
  </div>
  );
}

export default VideoMain;
