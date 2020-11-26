import React from "react";

const Notification = ({ message, clearMessage }) => {
  return (
    <article>
      {message} <button onClick={clearMessage}>x</button>
    </article>
  );
};

export default Notification;
