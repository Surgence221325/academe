import './Forum.css'
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Likes from "./likes";
import Comments from "./Comments";

const Home = () => {
    const [thread, setThread] = useState("");
    const [content, setContent] = useState("")
    const [threadList, setThreadList] = useState([]);

    //👇🏻 The useEffect Hook
    useEffect(() => {
		const checkUser = () => {
      fetch("http://localhost:3000/api/all/threads")
        .then((res) => res.json())
        .then((data) => setThreadList(data.threads))
        .catch((err) => console.error(err));
		};
		checkUser();
	}, []);

    const createThread = () => {
        fetch("http://localhost:3000/api/create/thread", {
            method: "POST",
            body: JSON.stringify({
                thread,
                content,
                userId: localStorage.getItem("_id"),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                setThreadList(data.threads);
            })
            .catch((err) => console.error(err));
    };

    
    //👇🏻 Triggered when the form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        //👇🏻 Calls the function
        createThread();
        setThread("");
        setContent("");
    };


    return (
        <>
            
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                <div className='home__container'>
						<label htmlFor='thread'>Title</label>
						<input
							type='text'
							name='thread'
							required
							value={thread}
							onChange={(e) => setThread(e.target.value)}
						/>
                        <label htmlFor='content'>Content</label>
						<input
							type='textarea'
							name='content'
							required
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</div>
                    <button className='homeBtn'>CREATE THREAD</button>
                </form>
    
                <div className='thread__container'>
                {threadList.map((thread) => (
                    <div className='thread__item' key={thread.id}>
                        <p>{thread.title}</p>
                        <div className='react__container'>
                            <Likes numberOfLikes={thread.likes.length} threadId={thread.id} />
                            <Comments
                                numberOfComments={thread.replies.length}
                                threadId={thread.id}
                                title={thread.title}
                            />
                        </div>
                    </div>
                ))}
            </div>
            </main>
        </>
    );
    
};

export default Home;
