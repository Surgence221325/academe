import React, { useState, useEffect } from 'react';
import AgoraRTM from 'agora-rtm-sdk';

const ChatBox = () => {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Create Agora RTM client and login to it
    const client = AgoraRTM.createInstance('c7d5d37307434a5288b89c39d5a9cdf0');
    setClient(client);
    client.on('ConnectionStateChanged', (newState, reason) => {
      console.log('on connection state changed to ' + newState + ' reason: ' + reason);
    });
    const randNum = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000).toString();
    client.login({ token: null, uid: randNum}).then(() => {
      console.log('login success');
      const channel = client.createChannel('Academe');
      setChannel(channel);
      channel.join().then(() => {
        console.log('join channel success');
        channel.on('ChannelMessage', ({ text }, senderId) => {
            console.log("Message sent")
          setMessages((messages) => [...messages, { senderId, text }]);
        });
      });
    }).catch((err) => {
      console.log('login failure', err);
    });

    // Listen for changes in the URL parameters
    window.addEventListener('popstate', handlePopState);

    // Cleanup function
    return () => {
      client.logout();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleSend = () => {
    if (channel && text.trim() !== '') {
        channel.sendMessage({text});
        setMessages((prevMessages) => [...prevMessages, { senderId: "me", text }]);
        setText('');
      }
    };

  const handlePopState = () => {
    // Get the message from the URL parameter
    const message = new URLSearchParams(window.location.search).get('message');

    // Add the message to the state
    if (message) {
      setMessages((messages) => [...messages, { senderId: 'URL', text: message }]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the URL with the message as a parameter
    // window.history.pushState(null, null, `/?message=${encodeURIComponent(text)}`);

    // Send the message through Agora RTM
    handleSend();
  };

  return (
    <div>
      {/* <div>
        {messages.map(({ senderId, text }, index) => (
          <div key={index}>
            {senderId}: {text}
          </div>
        ))}
      </div> */}
      <div id="messages">
  {messages.map(({ senderId, text }, index) => (
    <div key={index}>
      {senderId}: {text}
    </div>
  ))}
</div>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={handleSend}>Send</button>
        </form>
      </div>
    </div>
  );
};
export default ChatBox;