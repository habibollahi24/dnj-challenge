import React, { useState } from "react";
import Avatar from "../avatar/Avatar";
import InputField from "../input/InputField";
import style from "./addDiscussion.module.scss";
import userImage from "../../../assets/images/user.jpg";
import axios from "axios";
import { IUser } from "../../../model/model";

const user: IUser = {
   name: "mohammad",
   avatar: userImage,
};

interface AddDiscussionProps {
   sendComment: (c: any) => void;
}

const AddDiscussion = ({ sendComment }: AddDiscussionProps) => {
   const [textComment, setTextComment] = useState("");
   const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const response = await axios.post("http://localhost:8000/discussions", {
         id: Math.floor(Math.random() * 100000000),
         date: Date.now(),
         user: { name: user.name, avatar: user.avatar },
         text: textComment,
         likes: 0,
         iLikedIt: false,
         replies: [],
      });
      sendComment(response.data);
      setTextComment("");
   };
   return (
      <div className={style.addDiscussionContainer}>
         <form onSubmit={submitComment}>
            <Avatar src={user.avatar || ""} alt={user.name} />
            <InputField
               placeholder="start a discussion"
               value={textComment}
               onChange={(e) => setTextComment(e.target.value)}
            />
         </form>
      </div>
   );
};

export default AddDiscussion;
