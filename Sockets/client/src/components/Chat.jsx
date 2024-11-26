import React from "react";

export default function Chat({
  senderSocketId,
  socketId,
  senderName,
  message,
  newJoin
}) {
  return (
    <>
      {(newJoin && socketId != newJoin?.socketId && (
        <div className="d-flex justify-content-center my-2">
          <div
            className="p-2 text-center text-muted bg-info rounded-3"
            style={{ maxWidth: "80%" }}
          >
            <strong>{newJoin.msg}</strong>
          </div>
        </div>
      )) ||
        (message && (
          <div
            className={`d-flex ${
              senderSocketId === socketId
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            <div
              className={`p-2 my-1 rounded-3 ${
                senderSocketId === socketId
                  ? "bg-primary text-white"
                  : "bg-light text-dark"
              }`}
              style={{ maxWidth: "75%" }} 
            >
              {senderName && <b>{senderName}:</b>} {message}
            </div>
          </div>
        ))}
    </>
  );
}
