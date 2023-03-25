import { useEffect, useState } from "react";
import AgoraRTC from 'agora-rtc-sdk-ng';

const APP_ID= '7af9bfe27cef41979d85bd9fa0f9afba';
const TOKEN= '007eJxTYNh6teqo/bqVj5cHCczkeXBn69zI/XdbX3K+jP4ndm7R00PiCgzmiWmWSWmpRubJqWkmhpbmlikWpkkplmmJBmmWiWlJiaIf5VIaAhkZ8h8fYmRkgEAQn53BMTkxJTU3lYEBAAgRJRY=';
const CHANNEL= 'Academe';

const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
})

export const VideoRoom = () => {
    const[users, setUsers] = useState([]);
    
    // const handleUserEntered = () => {

    // }

    // const handleUserGone = () => {

    // }

    useEffect(() => {
        // client.on("user-published", handleUserEntered);
        // client.on("user-left", handleUserGone);

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
    return <div>VideoRoom

        {users.map((user) => (
            <div key={user.uid}>{user.uid}</div>
        ))}
    </div>;
    
};