
import React, { useEffect, useState } from 'react'
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

var stompClient = null;
const ChatRoom = () => {
    const [privateChats, setPrivateChats] = useState(new Map());
    const [publicChats, setPublicChats] = useState([]);
    const [tab, setTab] = useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        receivername: '',
        connected: false,
        message: ''
    });
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const connect = () => {
        let Sock = new SockJS('http://localhost:9090/ws');
        stompClient = over(Sock);
        stompClient.connect({}, onConnected, onError);
    }

    const onConnected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
        userJoin();
    }

    const userJoin = () => {
        var chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        };
        stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    }

    const onMessageReceived = (payload) => {
        var payloadData = JSON.parse(payload.body);
        // eslint-disable-next-line default-case
        switch (payloadData.status) {
            case "JOIN":
                if (!privateChats.get(payloadData.senderName)) {
                    privateChats.set(payloadData.senderName, []);
                    setPrivateChats(new Map(privateChats));
                }
                break;
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
        }
    }

    const onPrivateMessage = (payload) => {
        console.log(payload);
        var payloadData = JSON.parse(payload.body);
        if (privateChats.get(payloadData.senderName)) {
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
        } else {
            let list = [];
            list.push(payloadData);
            privateChats.set(payloadData.senderName, list);
            setPrivateChats(new Map(privateChats));
        }
    }

    const onError = (err) => {
        console.log(err);

    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value });
    }
    const sendValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status: "MESSAGE"
            };
            console.log(chatMessage);
            stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const sendPrivateValue = () => {
        if (stompClient) {
            var chatMessage = {
                senderName: userData.username,
                receiverName: tab,
                message: userData.message,
                status: "MESSAGE"
            };

            if (userData.username !== tab) {
                privateChats.get(tab).push(chatMessage);
                setPrivateChats(new Map(privateChats));
            }
            stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
            setUserData({ ...userData, "message": "" });
        }
    }

    const handleUsername = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "username": value });
    }

    const registerUser = () => {
        connect();
    }

    return (
        <div className='shadow-[0_0_10px_20px_rgba(2555,255,255,0)] flex flex-col h-[100vh] w-[100%] items-center justify-evenly bg-[#262626]'>
            <h2 className='text-[40px] text-[#d9d9d9] self-start ml-[60px]'
            >Share&Care</h2>
            <div className="container flex w-[85%] h-[85vh] justify-center rounded items-center bg-[#d9d9d9]">
                {userData.connected ?
                    <div className="chat-box flex flex-col h-[100%] w-[100%] justify-between p-[10px]">
                        <div className="member-list rounded-lg bg-[#262626]">
                            <ul>
                                <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"} text-[25px] text-[#b3b3b3] ml-[5px]`}>Chatroom</li>
                                {[...privateChats.keys()].map((name, index) => (
                                    <li onClick={() => { setTab(name) }} className={`member ${tab === name && "active"} ml-[30px] text-[#8c8c8c] font-light italic`} key={index}>{` ${name} online...`}</li>
                                ))}
                            </ul>
                        </div>

                        {tab === "CHATROOM" && <div className="chat-content ">
                            <div className="chat-messages mb-3 rounded-lg list-none flex flex-col">
                                {publicChats.map((chat, index) => (
                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                        {chat.senderName !== userData.username && <div className='rounded-lg pl-[15px] max-w-[250px] flex flex-col mb-[10px] bg-[#0d0d0d] text-white'><div className="avatar text-[#ff3333]">{chat.senderName}</div><div className="message-data">{chat.message}</div></div>}
                                        {chat.senderName === userData.username && <div className=' rounded-lg pl-[15px] max-w-[250px] flex flex-col mb-[10px] bg-[#004d39] text-white'><div className="avatar self text-[#cc5200]">{chat.senderName}</div><div className="message-data">{chat.message}</div></div>}
                                    </li>

                                ))}
                            </div>

                            <div className="send-message flex justify-between">
                                <input type="text" className="input-message h-[45px] w-[91%] rounded-full pl-[15px] outline-none border-blue-700 border-2" placeholder="Type a message..." value={userData.message} onChange={handleMessage} />
                                <button type="button" className="send-button h-[47px] w-[47px] rounded-full mr-[5px] bg-[#00994d]" onClick={sendValue}><i class="fa-solid fa-paper-plane size-5 text-[20px]" ></i></button>
                            </div>
                        </div>}

                        {tab !== "CHATROOM" && <div className="chat-content">
                            <ul className="chat-messages">
                                {[...privateChats.get(tab)].map((chat, index) => (
                                    <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                                        {chat.senderName !== userData.username && <><div className="avatar">{chat.senderName}</div><div className="message-data">{chat.message}</div></>}
                                        {chat.senderName === userData.username && <><div className="avatar self">{chat.senderName}</div><div className="message-data">{chat.message}</div></>}
                                    </li>
                                ))}
                            </ul>

                            <div className="send-message">
                                <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} />
                                <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                            </div>
                        </div>}
                    </div>
                    :
                    <div className="shadow-[0_0_10px_2px_rgba(0,0,0,0.3)] register flex flex-row p-2 h-[60px] w-[330px] max-w-[400px] bg-[#808080] rounded-lg justify-between hover:h-[65px] hover:w-[340px] delay-50" >
                        <input
                            className='w-[70%] rounded text-center text-[19px] font-sans outline-none bg-[#808080] placeholder-black'
                            id="user-name"
                            placeholder="Enter Your Name"
                            name="userName"
                            value={userData.username}
                            onChange={handleUsername}
                            margin="normal"
                        />
                        <button type="button" onClick={registerUser} className='border-green-950 border-[1px] w-[26%] rounded bg-[#008000] hover:bg-[#00b33c] delay-20'>
                            CONNECT
                        </button>
                    </div>}
            </div>
        </div>
    )
}

export default ChatRoom
