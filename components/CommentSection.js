import { useState } from "react";
import { Comments } from "./index";

function CommentSection({ comments }) {
  console.log("Comments", comments);
  return (
    <div className="min-h-6/12 border-t border-gray-700 pt-5 text-left">
      <h2 className="text-white font-semibold pb-5">1,495 Comments</h2>
      {comments
        ? comments.items.map((item) => (
            <Comments
              profileImageUrl={
                item.snippet.topLevelComment.snippet.profileImageUrl
              }
              textDisplay={item.snippet.topLevelComment.snippet.textDisplay}
              authorDisplayName={
                item.snippet.topLevelComment.snippet.authorDisplayName
              }
              likeCount={item.snippet.topLevelComment.snippet.likeCount}
              publishedAt={item.snippet.topLevelComment.snippet.publishedAt}
              profileImageUrl={
                item.snippet.topLevelComment.snippet.authorProfileImageUrl
              }
            />
          ))
        : null}
    </div>
  );
}

export default CommentSection;