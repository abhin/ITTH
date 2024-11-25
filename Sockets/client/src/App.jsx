import { useEffect, useState } from "react";
import ChatRoom from "./components/ChatRoom";
import EnterRoom from "./components/EnterRoom";
import { io } from "socket.io-client";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io("http://localhost:8001");

function App() {
  const navigate = useNavigate();
  const [chatMsg, setChatMsg] = useState([]);
  const [roomNum, setRoomNum] = useState("");
  const [name, setName] = useState("");

  function handleJoinRoom() {
    socket.emit("join-room", {
      roomNum: roomNum,
      name: name,
    });
  }

  const sendMessage = (message) => {
    socket.emit("send-message", {
      chatMsg: message,
      roomNum
    });
  };

  useEffect(() => {
    socket.on("connected", (data) => {
      toast.success(data?.message);
    });

    socket.on("join-success", (data) => {
      const { message, success } = data;
      setChatMsg((prevChatMsg) => [...prevChatMsg, message]);
      if (success) navigate("/chat-room");
    });

    socket.on("new-chat-message", (data) => {
      const { chatMsg } = data;
      setChatMsg((prevChatMsg) => [...prevChatMsg, chatMsg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const enterRoomCmpont = (
    <EnterRoom
      handleJoinRoom={handleJoinRoom}
      roomNum={roomNum}
      setRoomNum={setRoomNum}
      name={name}
      setName={setName}
    />
  );

  return (
    <>
      <ToastContainer />
      <div className="container">
        <Routes>
          <Route path="/" element={enterRoomCmpont} />
          <Route path="join-room" element={enterRoomCmpont} />
          <Route
            path="chat-room"
            element={<ChatRoom roomNum={roomNum} chatMsg={chatMsg} sendMessage={sendMessage} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
