import React, { useState } from "react";
import { useMutation } from "@apollo/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <h3> Request Password Reset </h3>
      <form onSubmit={(e) => handleSubmit(e, requestPassReset)}>
        <input type="email" />
        <input type="submit" />
      </form>
    </>
  );
};
