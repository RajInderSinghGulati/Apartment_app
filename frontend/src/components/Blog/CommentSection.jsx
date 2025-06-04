import React from "react";
import "../../styles/blog.css";

function CommentSection({ comments }) {
  return (
    <div style={{ marginTop: "0.5rem" }}>
      <strong>Comments:</strong>
      <ul style={{ paddingLeft: "1rem" }}>
        {comments.map(comment => (
          <li key={comment.id}>
            <b>{comment.author}:</b> {comment.text}
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Add a comment..." style={{ width: "100%", marginTop: "0.5rem" }} />
    </div>
  );
}

export default CommentSection;
