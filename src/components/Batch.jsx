import React, { useState, useEffect } from "react";

const states = {
  upcoming: 0,
  passed: 1,
};

const Batch = ({ itemHour, itemMin }) => {
  const [status, setStatus] = useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      if (today.getHours() > itemHour || (today.getHours() === itemHour && today.getMinutes() >= itemMin)) {
        // passed; task done
        setStatus(states.passed);
      } else {
        // upcoming; haven't done
        setStatus(states.upcoming);
      }
    });
    return () => clearInterval(interval);
  }, [itemHour, itemMin]);

  if (status == states.upcoming) {
    return <div className="badge badge-info align-middle justify-center">UPCOMING</div>;
  } else {
    return <div className="badge badge-success align-middle justify-center">PASSED</div>;
  }
};

export default Batch;
