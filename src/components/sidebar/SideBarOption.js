import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class SideBarOption extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    lastMessage: PropTypes.string,
    active: PropTypes.bool,
    onClick: PropTypes.func
  };
  static defaultProps = {
    lastMessage: "",
    active: false,
    onClick: () => {}
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.lastMessage !== nextProps.lastMessage ||
      this.props.name !== nextProps.name ||
      this.props.active !== nextProps.active
    );
  }

  render() {
    const { active, lastMessage, name, onClick } = this.props;

    return (
      <div
        className={`user ${active ? "active" : ""}`}
        onClick={e => {
          onClick(e);
        }}
      >
        <div className="user-photo">{name[0]}</div>
        <div className="user-info">
          <div className="name">
            {name.trim().length < 11 ? name.trim() : name.trim().slice(0, 10)}
          </div>
          <div className="last-message">
            {lastMessage.length < 40
              ? lastMessage
              : `${lastMessage.slice(0, 40)}...`}
          </div>
        </div>
      </div>
    );
  }
}
