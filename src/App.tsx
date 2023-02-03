import { useEffect, useState } from "react";
import AddComment from "./components/add-comment/AddComment";
import Comments from "./components/comments/Comments";
import { IDiscussion } from "./model/model";
import getCommentsApi from "./service/getCommentsApi";

function App() {
   const [comments, setComments] = useState<IDiscussion[]>([]);

   useEffect(() => {
      const getAllComments = async () => {
         const response = await getCommentsApi();

         setComments(response.data.sort((x: any, y: any) => y.date - x.date));
      };
      getAllComments();
   }, []);

   const addFirstComment = (data: IDiscussion) => {
      setComments(
         [...comments, data].sort((x: any, y: any) => y.date - x.date)
      );
   };

   const changeReply = (updatedComments: IDiscussion[]) => {
      setComments(updatedComments.sort((x: any, y: any) => y.date - x.date));
   };

   const updatedLikes = (updatedComments: IDiscussion[]) => {
      setComments(updatedComments.sort((x: any, y: any) => y.date - x.date));
   };

   return (
      <div className="container">
         <AddComment addFirstComment={addFirstComment} />
         <>
            {comments.map((comment: IDiscussion) => {
               return (
                  <Comments
                     key={comment.id}
                     {...comment}
                     changeReply={changeReply}
                     updatedLikes={updatedLikes}
                  />
               );
            })}
         </>
      </div>
   );
}

export default App;
