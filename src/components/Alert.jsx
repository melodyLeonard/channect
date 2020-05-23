import React from "react";

// reactstrap components
import { Alert } from "reactstrap";

const CustomAlert = ({ content, color, tag, toggle }) => {
  return (
    <Alert
      color={color}
      isOpen={content ? true : false}
      fade={false}
      toggle={toggle}
    >
      <span>
        <b>{tag} - </b>
        {content}
      </span>
    </Alert>
  );
};

export default CustomAlert;
