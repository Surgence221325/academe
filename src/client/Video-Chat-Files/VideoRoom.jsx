import { useEffect, useState } from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';
import { VideoPlayer } from "./VideoPlayer";
import { ChatBox } from "./ChatBox";

const APP_ID= "7af9bfe27cef41979d85bd9fa0f9afba";
const TOKEN= import.meta.env.VITE_AGORA_API_KEY;
const CHANNEL= "Academe";


const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
});

export const VideoRoom = () => {
    const[users, setUsers] = useState([]);
    const handleUserEntered = async (user, mediaType) => {
        await client.subscribe(user, mediaType);
    
        if (mediaType === 'video') {
          setUsers((previousUsers) => [...previousUsers, { 
              uid: user.uid, 
              video: user.videoTrack 
          }]);
        }
    
        if (mediaType === 'audio') {
          // user.audioTrack.play()
        }
    };
      


    const handleUserGone = () =>  {}

    useEffect(() => {
        client.on("user-published", handleUserEntered);
        client.on("user-left", handleUserGone);

        client.join(APP_ID, CHANNEL, TOKEN, null).then((uid) => 
             Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
        ).then(([tracks, uid]) => {
            const [audio, video] = tracks;
            setUsers((previousUsers) => [...previousUsers,
                 {
                uid,
                video,
            },
        ]);
            client.publish(tracks);
        });

    }, []);
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <ChatBox />
            <div style={{ 
            display: "grid", 
            gridTemplateColumns: `repeat(${users.length}, 1fr)`, 
            gap: "10px"
          }}>
            {users.map((user) => (
              <VideoPlayer key={user.uid} user={user} />
            ))}
          </div>
        </div>
      );
};
