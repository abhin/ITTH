import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatRoom = ({ roomNum, chatMsg, sendMessage }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!roomNum) navigate('/');
  }, [roomNum, navigate]);

  return (
    <div
      className="d-flex justify-content-center align-items-end"
      style={{ minWidth: "100vw", minHeight: "100vh" }}
    >
      <div className="container my-0" style={{ maxWidth: "1000px" }}>
        <div
          className="border rounded p-3 bg-white shadow-sm"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <div className="mb-3">
            {(chatMsg.length > 0 &&
              chatMsg.map((chat, index) => <p key={index}>{chat}</p>)) || (
              <div className="text-center text-muted">
                No messages yet. Start chatting!
              </div>
            )}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
          }}
        >
          <div className="d-flex align-items-center p-3 border-top bg-light ">
            <textarea
              placeholder="Type a message..."
              className="me-2 flex-grow-1"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              required
            ></textarea>
            <button type="submit" className="primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
