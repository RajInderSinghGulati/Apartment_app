import React from "react";
import CommentSection from "./CommentSection";

export default function PostCard({ post }) {
  return (
    <div className="blog-post-card">
      <div className="blog-post-header">{post.author}</div>
      <div className="blog-post-content">{post.content}</div>
      <button className="blog-like-btn">Like ({post.likes})</button>
      <CommentSection comments={post.comments} />
    </div>
  );
}
