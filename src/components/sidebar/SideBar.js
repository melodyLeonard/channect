import React, { Component } from "react";

import Clear from "react-icons/lib/md/clear";
import { SideBarOption } from "./SideBarOption";
import  { last, get, differenceBy } from "lodash";
import { createChatNameFromUsers } from "../../Factories";
import PropTypes from "prop-types";

export default class SideBar extends Component {
  static propTypes = {
    onSendPrivateMessage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    setActiveChat: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    chats: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeChat: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  static type = {
    USERS: "users",
    CHATS: "chats"
  };
  constructor(props) {
    super(props);
    this.state = {
      reciever: "",
      activeSideBar: SideBar.type.CHATS
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    const { reciever } = this.state;
    const { onSendPrivateMessage } = this.props;

    onSendPrivateMessage(reciever);
    this.setState({ reciever: "" });
  };

  addChatForUser = reciever => {
    this.props.onSendPrivateMessage(reciever);
    this.setActiveSideBar(SideBar.type.CHATS);
  };
  setActiveSideBar = activeSideBar => {
    if (activeSideBar !== this.state.activeSideBar)
      this.setState({ activeSideBar });
  };

  render() {
    const {
      chats,
      activeChat,
      user,
      setActiveChat,
      logout,
      users,
      classes
    } = this.props;
    const { reciever, activeSideBar } = this.state;
    return (
      <div id={classes}>
        <div className="heading">
          <div className="current-user">
            <span>
              {user.name.length < 11 ? user.name : user.name.slice(0, 10)}
            </span>
            <div
              onClick={() => {
                logout();
              }}
              title="Logout"
              className="logout"
            >
              <Clear />
            </div>
          </div>
        </div>

        <div className="side-bar-select">
          <div
            onClick={() => {
              this.setActiveSideBar(SideBar.type.CHATS);
            }}
            className={`side-bar-select__option ${
              activeSideBar === SideBar.type.CHATS ? "active" : ""
            }`}
          >
            <span>Chats</span>
          </div>

          <div
            onClick={() => {
              this.setActiveSideBar(SideBar.type.USERS);
            }}
            className={`side-bar-select__option ${
              activeSideBar === SideBar.type.USERS ? "active" : ""
            }`}
          >
            <span>Users</span>
          </div>
        </div>

        <div
          className="users"
          ref="users"
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {activeSideBar === SideBar.type.CHATS
            ? chats.map(chat => {
                return (
                  <SideBarOption
                    key={chat.id}
                    lastMessage={get(last(chat.messages), "message", "")}
                    name={
                      chat.isCommunity
                        ? chat.name
                        : createChatNameFromUsers(chat.users, user.name)
                    }
                    active={activeChat.id === chat.id}
                    onClick={() => {
                      this.props.setActiveChat(chat);
                    }}
                  />
                );
              })
            : differenceBy(users, [user], 'id').map(otherUser => {
                return (
                  <SideBarOption
                    key={otherUser.id}
                    name={otherUser.name}
                    onClick={() => {
                      this.addChatForUser(otherUser.name);
                    }}
                  />
                );
              })}
        </div>
      </div>
    );
  }
}
