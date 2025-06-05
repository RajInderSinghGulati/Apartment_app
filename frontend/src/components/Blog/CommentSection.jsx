import React from "react";

export default function CommentSection({ comments }) {
  return (
    <div className="blog-comment-section">
      <ul className="blog-comment-list">
        {comments.map((c, i) => (
          <li key={i}><b>{c.author}:</b> {c.text}</li>
        ))}
      </ul>
      <input className="blog-comment-input" placeholder="Add a comment..." />
    </div>
  );
}
