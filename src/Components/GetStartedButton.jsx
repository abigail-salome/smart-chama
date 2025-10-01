import React from "react";
import { Link } from "react-router-dom";

const GetStartedButton = () => {
  return (
    <div>
      <Link to="/sign-up">
        <button className="get-started-button">Get Started</button>
      </Link>
    </div>
  );
};

export default GetStartedButton;
