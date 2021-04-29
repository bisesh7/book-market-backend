import React from "react";
import { useTimer } from "react-timer-hook";

const RedirectTimerComponent = ({ expiryTimestamp, onExpire, history }) => {
  const { seconds } = useTimer({
    expiryTimestamp,
    autoStart: true,
    onExpire,
  });

  return (
    <div>
      Redirecting in <span>{seconds}</span> secs. Click{" "}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          history.push("/");
        }}
      >
        here
      </a>{" "}
      to save your time.
    </div>
  );
};

export default RedirectTimerComponent;
