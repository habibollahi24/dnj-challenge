import React, { useState } from "react";
import Avatar from "../shared/avatar/Avatar";
import InputField from "../shared/input/InputField";
import style from "./addComment.module.scss";
import userImage from "../../assets/images/user.jpg";
import { IUser } from "../../model/model";
import addFirstCommentApi from "../../service/addFirstCommentApi";

const user: IUser = {
   name: "mohammad",
   avatar: userImage,
};

interface Props {
   addFirstComment: (t: any) => void;
}

const AddComment = ({ addFirstComment }: Props) => {
   const [textComment, setTextComment] = useState("");
   const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (textComment.trim().length === 0) {
         return;
      }
      const response = await addFirstCommentApi({
         id: Math.floor(Math.random() * 100000000),
         date: Date.now(),
         user: { name: user.name, avatar: user.avatar },
         text: textComment,
         likes: 0,
         iLikedIt: false,
         replies: [],
      });
      addFirstComment(response.data);
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

export default AddComment;
