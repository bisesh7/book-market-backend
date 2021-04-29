import React from "react";
import { useTimer } from "react-timer-hook";

const RedirectTimerComponent = ({ expiryTimestamp, onExpire }) => {
  const { seconds } = useTimer({
    expiryTimestamp,
    autoStart: true,
    onExpire,
  });

  return (
    <div>
      Redirecting in <span>{seconds}</span> secs.
    </div>
  );
};

export default RedirectTimerComponent;
