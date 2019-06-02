import React from "react";
import MobileDetect from "mobile-detect";

function isMobile(WrappedComponent) {
  return (props) => {
    const md = new MobileDetect(window.navigator.userAgent);
    const mobile = !!md.mobile();
    return <WrappedComponent isMobile={mobile} {...props} />;
  };
}

export default isMobile;