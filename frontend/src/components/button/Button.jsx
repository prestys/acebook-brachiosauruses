import React from "react";
import styles from "./Button.css";

const Button = (props) => {
  const { navigate, routePath, text } = props;

  const link = () => {
    navigate(routePath );
  };

  return (
    <button class="button" onClick={link}>
      {text}
    </button>
  );
};

export default Button;
