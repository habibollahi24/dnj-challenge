import React from "react";
import style from "./avatar.module.scss";

interface AvatarProps {
   src: string;
   alt: string;
}

const Avatar = ({ src, alt }: AvatarProps) => {
   return (
      <div className={style.avatarContainer}>
         {src ? (
            <img src={src} alt={alt} />
         ) : (
            <div className={style.avatarText}>
               {alt
                  .split(" ")
                  .map((i) => i[0])
                  .join(" ")}
            </div>
         )}
      </div>
   );
};

export default Avatar;
