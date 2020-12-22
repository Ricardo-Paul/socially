import React from "react";
import MessageChat from "./MessageChat";
import MessageUsers from "./MessageUsers";

const Message = () => {

    return(
      <React.Fragment>
          <MessageUsers />
          <MessageChat />
      </React.Fragment>
    )
}

export default Message