import React from "react";
import FAVideo from "react-icons/lib/fa/video-camera";
import FAUserPlus from "react-icons/lib/fa/user-plus";
import MdEllipsisMenu from "react-icons/lib/md/keyboard-control";

export default function({ name, numberOfUsers, click }) {
  return (
    <div className="chat-header">
      <MdEllipsisMenu onClick={click} className="header-menu" />
      <div className="user-info">
        <div className="user-name">{name.toUpperCase()}</div>
        <div className="status">
          <div className="indicator"></div>
          <span>{numberOfUsers ? numberOfUsers : null}</span>
        </div>
      </div>
      <div className="options">
        <FAVideo className="header-icon" />
        <FAUserPlus className="header-icon" />
      </div>
    </div>
  );
}
