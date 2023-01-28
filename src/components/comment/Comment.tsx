import Avatar from "../shared/avatar/Avatar";
import style from "./comment.module.scss";
import { HiThumbUp } from "react-icons/hi";
import Button from "../shared/button/Button";
import InputField from "./../shared/input/InputField";
import userImage from "../../assets/images/user.jpg";
import { useState } from "react";
import { timeDifference } from "./../helper/formatDate";
import axios from "axios";
import { IDiscussion, IUser } from "../../model/model";

const masterUser: IUser = {
   name: "mohammad",
   avatar: userImage,
};

interface ChangeReply {
   changeReply: (v: IDiscussion[]) => void;
   updatedLikes: (v: IDiscussion[]) => void;
}

const Comment = (props: IDiscussion & ChangeReply) => {
   const {
      text,
      date,
      user,
      likes,
      replies,
      id,
      iLikedIt,
      changeReply,
      updatedLikes,
   } = props;
   const [commentID, setCommentID] = useState<null | number>(null);

   const [replyComment, setReplyComment] = useState("");

   const HandleReply = (id: number) => {
      setCommentID(id);
      if (id === commentID) {
         setCommentID(null);
      }
   };

   const handleReplyComment = async (
      e: React.FormEvent<HTMLFormElement>,
      id: number
   ) => {
      e.preventDefault();
      const response = await axios.get(
         `http://localhost:8000/discussions/${id}`
      );

      const res = await axios.put(`http://localhost:8000/discussions/${id}`, {
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
      const getUpdatedData = await axios.get(
         `http://localhost:8000/discussions/`
      );

      changeReply(getUpdatedData.data);
      setReplyComment("");
   };

   const handleLike = async (id: number) => {
      const response = await axios.get(
         `http://localhost:8000/discussions/${id}`
      );

      const res = await axios.put(`http://localhost:8000/discussions/${id}`, {
         ...response.data,
         iLikedIt: response.data.iLikedIt ? false : true,
         likes: response.data.iLikedIt
            ? response.data.likes - 1
            : response.data.likes + 1,
      });
      const responseUpdated = await axios.get(
         `http://localhost:8000/discussions/`
      );
      updatedLikes(responseUpdated.data);
   };
   const handleReplyLike = async (id: number, replyId: number) => {
      const response = await axios.get(
         `http://localhost:8000/discussions/${id}`
      );

      const mapped = response.data.replies.map((item: any) => {
         if (item.id === replyId) {
            return {
               ...item,
               iLikedIt: item.iLikedIt ? false : true,
               likes: item.iLikedIt ? item.likes - 1 : item.likes + 1,
            };
         } else {
            return item;
         }
      });

      const res = await axios.put(`http://localhost:8000/discussions/${id}`, {
         ...response.data,
         replies: mapped,
      });
      const responseUpdated = await axios.get(
         `http://localhost:8000/discussions/`
      );
      updatedLikes(responseUpdated.data);
   };

   return (
      <div className={style.commentBox}>
         <div className={style.comment}>
            <Avatar src={user.avatar || ""} alt={user.name} />
            <div className={style.commentBody}>
               <h2>{user.name}</h2>
               <span className={style.date}>
                  {timeDifference(new Date(), date)}
               </span>
               <p>{text}</p>
               <Button
                  className="like"
                  onClick={() => handleLike(id)}
                  iLikedIt={iLikedIt}
               >
                  <HiThumbUp />
                  {likes}
               </Button>
               <Button onClick={() => HandleReply(id)} className="reply">
                  Reply
               </Button>
            </div>
         </div>
         {replies?.map((reply) => (
            <div key={reply.id} className={style.subComment}>
               <div className={style.comment}>
                  <Avatar src={reply.user.avatar || ""} alt={reply.user.name} />
                  <div className={style.commentBody}>
                     <h2>{reply.user.name}</h2>
                     <span className={style.date}>
                        {timeDifference(new Date(), reply.date)}
                     </span>
                     <p>{reply.text}</p>
                     <Button
                        className="like"
                        onClick={() => handleReplyLike(id, reply.id)}
                        iLikedIt={reply.iLikedIt}
                     >
                        <HiThumbUp />
                        {reply.likes}
                     </Button>
                  </div>
               </div>
            </div>
         ))}
         {id === commentID && (
            <form
               onSubmit={(e) => handleReplyComment(e, id)}
               className={style.subReply}
            >
               <Avatar src={masterUser.avatar || ""} alt={user.name} />
               <InputField
                  placeholder="Reply"
                  value={replyComment}
                  onChange={(e) => setReplyComment(e.target.value)}
               />
            </form>
         )}
      </div>
   );
};

export default Comment;
