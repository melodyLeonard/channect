import React, { Component } from "react";
import Send from "react-icons/lib/md/send";

export default class MessageInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
      isTyping: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.sendMessage();
    this.setState({ message: "" });
  };

  sendMessage = () => {
    this.props.sendMessage(this.state.message);
  };

  componentWillUnmount() {
    this.stopCheckingTyping();
  }

  sendTyping = () => {
    this.lastUpdateTime = Date.now();
    if (!this.state.isTyping) {
      this.setState({ isTyping: true });
      this.props.sendTyping(true);
      this.startCheckingTyping();
    }
  };

  /*
   *	startCheckingTyping
   *	Start an interval that checks if the user is typing.
   */
  startCheckingTyping = () => {
    this.typingInterval = setInterval(() => {
      if (Date.now() - this.lastUpdateTime > 2000) {
        this.setState({ isTyping: false });
        this.stopCheckingTyping();
      }
    }, 2000);
  };

  /*
   *	stopCheckingTyping
   *	Start the interval from checking if the user is typing.
   */
  stopCheckingTyping = () => {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.props.sendTyping(false);
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div className="message-input">
        <form onSubmit={this.handleSubmit} className="message-form">
          <input
            id="message"
            ref={"messageinput"}
            autoFocus
            type="text"
            className="form-control"
            value={message}
            autoComplete={"off"}
            placeholder="Type something interesting"
            onKeyUp={e => {
              e.keyCode !== 13 && this.sendTyping();
            }}
            onChange={({ target }) => {
              this.setState({ message: target.value });
            }}
          />
          <button
            disabled={message.trim().length < 1}
            type="submit"
            className="send"
          >
            {" "}
            <Send className="icon" />{" "}
          </button>
        </form>
      </div>
    );
  }
}
