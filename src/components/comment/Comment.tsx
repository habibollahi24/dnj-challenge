import Avatar from "../shared/avatar/Avatar";
import Button from "../shared/button/Button";
import { HiThumbUp } from "react-icons/hi";
import style from "./comment.module.scss";
import { timeDifference } from "../helper/formatDate";
import { useState } from "react";
import getCommentByIdApi from "./../../service/getCommentByIdApi";
import updateCommentsApi from "./../../service/updateCommentsApi";
import getCommentsApi from "./../../service/getCommentsApi";
import { IDiscussion } from "../../model/model";

interface AditionalProps {
   commentID: number | null;
   setCommentID: React.Dispatch<React.SetStateAction<number | null>>;
   updatedLikes?: (v: IDiscussion[]) => void;
   parent: boolean;
   handleFocus?: () => void;
   reply?: any;
}

const Comment = (props: IDiscussion & AditionalProps) => {
   const {
      text,
      date,
      user,
      likes,
      id,
      iLikedIt,
      updatedLikes,
      commentID,
      setCommentID,
      parent,
      reply,
      handleFocus,
   } = props;

   const HandleShowAddComment = (id: number) => {
      setCommentID(id);
      if (id === commentID) {
         setCommentID(null);
      }
      setTimeout(() => {
         handleFocus?.();
      }, 1);
   };

   const handleFirstCommentLike = async (id: number) => {
      const response = await getCommentByIdApi(id);

      await updateCommentsApi(id, {
         ...response.data,
         iLikedIt: response.data.iLikedIt ? false : true,
         likes: response.data.iLikedIt
            ? response.data.likes - 1
            : response.data.likes + 1,
      });
      const responseUpdated = await getCommentsApi();
      updatedLikes && updatedLikes(responseUpdated.data);
   };

   const handleReplyCommentLike = async (id: number, replyId?: number) => {
      const response = await getCommentByIdApi(id);

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

      await updateCommentsApi(id, {
         ...response.data,
         replies: mapped,
      });
      const responseUpdated = await getCommentsApi();
      updatedLikes && updatedLikes(responseUpdated.data);
   };

   if (parent) {
      return (
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
                  onClick={() => handleFirstCommentLike(id)}
                  iLikedIt={iLikedIt}
               >
                  <HiThumbUp />
                  {likes}
               </Button>

               <Button
                  onClick={() => HandleShowAddComment(id)}
                  className="reply"
               >
                  Reply
               </Button>
            </div>
         </div>
      );
   } else {
      return (
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
                  onClick={() => handleReplyCommentLike(id, reply.id)}
                  iLikedIt={reply.iLikedIt}
               >
                  <HiThumbUp />
                  {reply.likes}
               </Button>
            </div>
         </div>
      );
   }
};

export default Comment;
