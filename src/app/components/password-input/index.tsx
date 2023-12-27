"use client";

import React from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import CustomInput from "../custom-input";

const PasswordInput = ({ placeholder }: { placeholder: string }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <CustomInput
      labelName='Password'
      inputProps={{ placeholder: placeholder, name: "password", type: isVisible ? "text" : "password" }}
      rightIcon={
        <button onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <EyeOpenIcon color='black' height='18px' width='24px' cursor='pointer' />
          ) : (
            <EyeClosedIcon color='black' height='18px' width='18px' cursor='pointer' />
          )}
        </button>
      }
    />
  );
};

export default PasswordInput;
