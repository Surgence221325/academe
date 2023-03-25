import { useEffect, useRef } from "react";



 export const VideoPlayer = ({ user }) => {
        const ref = useRef();
      
        useEffect(() => {
          if (user.video) {
            user.video.play(ref.current);
          }
      
          return () => {
            if (user.video) {
              user.video.stop();
            }
          };
        }, [user]);
      
        return (
          <div>
            UserId: {user.uid}
            <div ref={ref} style={{ width: "200px", height: "200px" }}></div>
          </div>
        );
};