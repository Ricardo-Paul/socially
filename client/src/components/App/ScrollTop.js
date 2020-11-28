import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
/**
 * scroll to the top of any component rendered
 *
 * @param {component} children wrapped component
 */
function ScrollTop({ children, location: { pathname } }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
}

export default withRouter(ScrollTop);
