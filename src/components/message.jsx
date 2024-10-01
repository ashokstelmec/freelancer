import React, { useState, useEffect } from 'react';
import "./message.css";

const Message = () => {
    const userId = sessionStorage.getItem("NUserID");
    const [topValue, setTopValue] = useState(8);
    const [chatList, setChatList] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState('');
    const [messageUser, setMessageUser] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [chatName, setChatName] = useState('Select a Chat');
    const [chatStatus, setChatStatus] = useState('Status');
    const [chatProfilePicture, setChatProfilePicture] = useState('../pic/profile_logo_default.png');
    const [messageInput, setMessageInput] = useState('');
    const [file, setFile] = useState(null);

    // Fetch chat list
    const fetchChatList = async () => {
        try {
            const apiUrlInbox = `https://freelancerapp.somee.com/GetInboxMessages?userId=${userId}`;
            const response = await fetch(apiUrlInbox);
            const messages = await response.json();
            setChatList(messages);

            if (messages.length > 0) {
                setTopValue(messages.length);
                setCurrentProjectId(messages[0].nProjectId);
                setMessageUser(messages[0].receiverId);
            }
        } catch (error) {
            console.error('Error fetching chat list:', error);
        }
    };

    // Load chat details
    const loadChatDetails = async (receiverId, userName, userPhoto, projectId) => {
        try {
            const apiUrlTopMessages = `https://freelancerapp.somee.com/GetTopMessagesAndMarkRead?userId=${userId}&projectId=${projectId}&top=${topValue}`;
            const response = await fetch(apiUrlTopMessages);
            const messages = await response.json();
            setChatMessages(messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)));

            setChatProfilePicture(userPhoto || '../pic/profile_logo_default.png');
            setChatName(userName || 'Unknown');
            setChatStatus('Active'); // Placeholder for status
        } catch (error) {
            console.error('Error loading chat details:', error);
        }
    };

    // Send message
    const sendMessage = async (content = '', file = null) => {
        if (!currentProjectId || !messageUser) return;

        const formData = new FormData();
        formData.append('SenderId', userId);
        formData.append('ReceiverId', messageUser);
        formData.append('Type', file ? 'document' : 'text');
        formData.append('Content', content);
        formData.append('ProjectName', sessionStorage.getItem('projectName') || '');
        formData.append('NProjectId', currentProjectId);
        if (file) formData.append('File', file);

        try {
            const response = await fetch('https://freelancerapp.somee.com/InsertNewMessage', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                fetchChatList();
                loadChatDetails(messageUser, '', '', currentProjectId);
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleFileAttachment = (event) => {
        setFile(event.target.files[0]);
        sendMessage('', event.target.files[0]); 
    };

    const handleSend = () => {
        if (messageInput.trim()) {
            sendMessage(messageInput);
            setMessageInput(''); 
        }
    };

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    const loadMoreMessages = async () => {
        setTopValue(topValue + 10);
        await loadChatDetails(messageUser, '', '', currentProjectId);
    };

    useEffect(() => {
        fetchChatList();
        const intervalId = setInterval(fetchChatList, 20000); 
        return () => clearInterval(intervalId); 
    }, [topValue]);

    return (
        <div className="message-container" style={{ }}>
            <div className="left-panel">
                <div className="search-bar">
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="Search" />
                    &nbsp;&nbsp;
                    <i className="bi bi-sliders fs-4"></i>
                </div>
                <div className="tab-links">
                    <a href="#" className="active">Chats</a>
                    <a href="#">Requests</a>
                </div>
                <ul className="chat-list">
                    {chatList.length > 0 ? (
                        chatList.map((msg, index) => (
                            <li key={index} className="chat-item" onClick={() => loadChatDetails(msg.receiverId, msg.receiverName, msg.receiverPhoto, msg.nProjectId)}>
                                <img src={msg.receiverPhoto || '../pic/profile_logo_default.png'} alt="Profile" />
                                <div className="chat-info">
                                    <div className="name">{msg.receiverName || 'Unknown'}</div>
                                    <div className="project-name" style={{ color: 'grey', fontSize: '0.8em' }}>
                                        Project Name: {msg.projectName || 'No Project'}
                                    </div>
                                    <div className="message">{msg.content || 'No message'}</div>
                                </div>
                                <div className="chat-time">{new Date(msg.timestamp).toLocaleDateString()}</div>
                                <div className="message-status">
                                    {msg.messageseen ? <i className="bi bi-check2-all seen-icon" title="Seen"></i> : <i className="bi bi-check2 unseen-icon" title="Unseen"></i>}
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No chats available</li>
                    )}
                </ul>
            </div>

            <div className="right-panel">
                <div className="chat-header">
                    <img src={chatProfilePicture} alt="Profile" />
                    <div>
                        <div className="name">{chatName}</div>
                        <div className="status">{chatStatus}</div>
                    </div>
                </div>
                <div className="chat-body">
                    {chatMessages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.senderId === userId ? 'sent' : 'received'}`}>
                            <img src={msg.senderPhoto || '../pic/profile_logo_default.png'} alt="Profile" className="message-profile-pic" />
                            <div className="message-content">
                                <div className="message-text">{msg.content}</div>
                                {msg.filePath && (
                                    <a href={msg.filePath} target="_blank" rel="noopener noreferrer" className="file-icon" title="Download or View">
                                        <i className="bi bi-file-earmark"></i>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-footer">
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={handleEnterPress}
                    />
                    <input type="file" onChange={handleFileAttachment} style={{ display: 'none' }} id="fileInput" />
                    <i className="bi bi-paperclip" onClick={() => document.getElementById('fileInput').click()} title="Attach file"></i>
                    <i className="bi bi-send" onClick={handleSend} title="Send message"></i>
                </div>
            </div>
        </div>
    );
};

export default Message;
