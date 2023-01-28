import axios from "axios";
import { useEffect, useState } from "react";
import "./App.scss";
import AddDiscussion from "./components/shared/add-discussion/AddDiscussion";
import Comment from "./components/comment/Comment";
import { IDiscussion } from "./model/model";

function App() {
   const [comments, setComments] = useState<IDiscussion[]>([]);

   useEffect(() => {
      const getComments = async () => {
         const response = await axios.get("http://localhost:8000/discussions");

         setComments(response.data.sort((x: any, y: any) => y.date - x.date));
      };
      getComments();
   }, []);

   const sendComment = (data: IDiscussion) => {
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
         <AddDiscussion sendComment={sendComment} />
         <>
            {comments.map((comment: IDiscussion) => {
               return (
                  <Comment
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
