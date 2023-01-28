import React from "react";
import style from "./button.module.scss";

interface ButtonProps {
   children: React.ReactNode;
   className: "reply" | "like";
   onClick?: () => void;
   iLikedIt?: boolean;
}

const Button = ({ children, className, onClick, iLikedIt }: ButtonProps) => {
   return (
      <button
         className={
            className === "reply"
               ? style.reply
               : iLikedIt
               ? style.replyedLike
               : className === "like"
               ? style.like
               : ""
         }
         onClick={onClick}
      >
         {children}
      </button>
   );
};

export default Button;
