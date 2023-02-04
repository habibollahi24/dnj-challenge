import Avatar from "../shared/avatar/Avatar";
import style from "./comments.module.scss";

import InputField from "../shared/input/InputField";
import userImage from "../../assets/images/user.jpg";
import { useRef, useState } from "react";

import { IDiscussion, IUser } from "../../model/model";

import getCommentByIdApi from "../../service/getCommentByIdApi";
import getCommentsApi from "../../service/getCommentsApi";
import updateCommentsApi from "../../service/updateCommentsApi";
import Comment from "../comment/Comment";

const masterUser: IUser = {
   name: "mohammad",
   avatar: userImage,
};

interface ChangeReply {
   changeReply: (v: IDiscussion[]) => void;
   updatedLikes: (v: IDiscussion[]) => void;
}

const Comments = (props: IDiscussion & ChangeReply) => {
   const { user, replies, id, changeReply } = props;

   const [commentID, setCommentID] = useState<null | number>(null);

   const [replyComment, setReplyComment] = useState("");

   const inputRef = useRef<HTMLInputElement>(null);

   const handleFocus = () => {
      inputRef.current?.focus();
   };
   const addreplyComment = async (
      e: React.FormEvent<HTMLFormElement>,
      id: number
   ) => {
      e.preventDefault();

      if (replyComment.trim().length === 0) {
         return;
      }

      const response = await getCommentByIdApi(id);

      await updateCommentsApi(id, {
         ...response.data,
         replies: [
            ...response.data.replies,
            {
               id: Math.floor(Math.random() * 100000000),
               date: Date.now(),
               user: {
                  name: masterUser.name,
                  avatar: masterUser.avatar,
               },
               text: replyComment,
               likes: 0,
               iLikedIt: false,
            },
         ],
      });

      const getUpdatedData = await getCommentsApi();

      changeReply(getUpdatedData.data);
      setReplyComment("");
   };

   return (
      <div className={style.commentBox}>
         <Comment
            {...props}
            commentID={commentID}
            setCommentID={setCommentID}
            parent={true}
            handleFocus={handleFocus}
         />
         {replies?.map((reply) => (
            <div key={reply.id} className={style.subComment}>
               <Comment
                  {...props}
                  reply={reply}
                  commentID={commentID}
                  setCommentID={setCommentID}
                  parent={false}
                  handleFocus={handleFocus}
               />
            </div>
         ))}
         {id === commentID && (
            <form
               onSubmit={(e) => addreplyComment(e, id)}
               className={style.subReply}
            >
               <Avatar src={masterUser.avatar || ""} alt={user.name} />
               <InputField
                  placeholder="Reply"
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
                  inputRef={inputRef}
               />
            </form>
         )}
      </div>
   );
};

export default Comments;
