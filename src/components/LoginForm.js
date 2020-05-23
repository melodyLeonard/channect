import React, { Component } from "react";
import { VERIFY_USER } from "../Events";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: "",
      error: "",
      password: ""
    };
  }

  setUser = ({ user, isUser }) => {
    if (isUser) {
      this.setError("username taken");
    } else if (this.state.nickname.trim() === "") {
      this.setError("nickname can not be empty");
    } else if (this.state.nickname.trim().length < 3) {
      this.setError("nickname must be atleast 3 characters");
    } else if (this.state.nickname.trim().length > 25) {
      this.setError("nickname is too long");
    } else {
      this.setError("");
      this.props.setUser(user);
    }
  };

  verifyUserIsNotLoggedIn = () => {
    const { socket } = this.props;
    const { nickname } = this.state;
    socket.emit(VERIFY_USER, nickname.trim().toUpperCase(), this.setUser);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.verifyUserIsNotLoggedIn();
  };

  handleChange = e => {
    this.setState({ nickname: e.target.value });
  };

  setError = error => {
    this.setState({ error });
  };

  render() {
    const { nickname, password, error } = this.state;
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>CHANNECT</h2>
          </label>
          <div className="error">{error ? error : null}</div>
          <input
            ref={input => {
              this.textInput = input;
            }}
            type="text"
            id="nickname"
            autoFocus
            value={nickname.trim()}
            onChange={this.handleChange}
            placeholder={"username"}
          />
          <button
            onClick={this.handleSubmit}
            disabled={nickname.trim().length < 3}
            type="submit"
            className="loginButton"
          >
            login
          </button>
        </form>
      </div>
    );
  }
}
