import { useState } from "react";
import { VideoRoom } from "./VideoRoom";
import ChatBox from "./ChatBox";


function VideoMain() {
  const [hasJoined, setHasJoined] = useState(false);
  return (
  <div className="VideoChat">
    <br></br>
    <h1>welcome to the study hall</h1>
    <br></br>

    {!hasJoined && (
    <button onClick={() => setHasJoined(true)}>
      Join Room
      </button>
    )}

    {hasJoined && <VideoRoom />}
    {hasJoined && <ChatBox />}
  </div>
  );
}

export default VideoMain;
