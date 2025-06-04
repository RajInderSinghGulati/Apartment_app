import React from "react";
import CommentSection from "./CommentSection";

function PostCard({ post }) {
  return (
    <div className="post-card" style={{ margin: "1rem 0", padding: "1rem", background: "#f9f9f9", borderRadius: "8px" }}>
      <div>
        <strong>{post.author}</strong> ({post.apartment})
      </div>
      <div style={{ margin: "0.5rem 0" }}>{post.content}</div>
      <div>
        <button>Like ({post.likes})</button>
      </div>
      <CommentSection comments={post.comments} />
    </div>
  );
}

export default PostCard;
