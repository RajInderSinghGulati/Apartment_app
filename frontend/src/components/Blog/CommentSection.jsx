import React, { useState } from "react";
import { commentOnBlogPost } from "../../api/blogs"; // Import your API function

export default function CommentSection({ comments = [], blogPostId, onCommentAdded }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleAddComment = async (e) => {
    if (e.key === "Enter" && input.trim()) {
      setError("");
      try {
        // You may want to include the current user's info in the comment
        await commentOnBlogPost(blogPostId, { text: input });
        setInput("");
        if (onCommentAdded) onCommentAdded(); // Optional: refresh comments in parent
      } catch (err) {
        setError(err.response?.data?.error || "Failed to add comment");
      }
    }
  };

  return (
    <div className="blog-comment-section">
      <ul className="blog-comment-list">
        {comments.map((c, i) => (
          <li key={i}><b>{c.author?.name || c.author || "User"}:</b> {c.text}</li>
        ))}
      </ul>
      <input
        className="blog-comment-input"
        placeholder="Add a comment..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleAddComment}
      />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
