import React, { useState } from "react";
import CommentSection from "./CommentSection";
import { likeBlog, votePoll } from "../../api/blogs"; // Import your API functions

export default function PostCard({ post, onPostUpdated }) {
  const [voted, setVoted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [likes, setLikes] = useState(post.likes || 0);
  const [error, setError] = useState("");

  const handleVote = async () => {
    if (!selected) return;
    setError("");
    try {
      await votePoll(post.poll._id, { option: selected });
      setVoted(true);
      if (onPostUpdated) onPostUpdated(); // Optionally refresh post data
    } catch (err) {
      setError(err.response?.data?.error || "Failed to vote");
    }
  };

  const handleLike = async () => {
    setError("");
    try {
      await likeBlog(post._id);
      setLikes(likes + 1);
      if (onPostUpdated) onPostUpdated();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to like post");
    }
  };

  return (
    <div className="blog-post-card">
      {post.media && post.mediaType === "image" && (
        <img src={post.media} alt="Blog media" className="blog-post-media" />
      )}
      {post.media && post.mediaType === "video" && (
        <video className="blog-post-media" controls>
          <source src={post.media} type="video/mp4" />
        </video>
      )}
      <div className="blog-post-header">{post.author?.name || post.author}</div>
      <div className="blog-post-content">{post.content}</div>
      {post.poll && (
        <div style={{ margin: "1em 0" }}>
          <div style={{ fontWeight: 700, color: "var(--accent)" }}>{post.poll.question}</div>
          {!voted ? (
            <div>
              {post.poll.options.map((opt, i) => (
                <label key={i} style={{ display: "block", margin: "0.4em 0" }}>
                  <input
                    type="radio"
                    name={`poll-${post._id}`}
                    value={opt}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                  />{" "}
                  {opt}
                </label>
              ))}
              <button style={{ marginTop: 8 }} disabled={!selected} onClick={handleVote}>
                Vote
              </button>
            </div>
          ) : (
            <div>
              {post.poll.options.map((opt, i) => (
                <div key={i} style={{ color: selected === opt ? "var(--primary)" : "var(--gray)" }}>
                  {opt} {selected === opt && "✔️"}
                </div>
              ))}
              <div style={{ color: "var(--success)", marginTop: 6 }}>Thank you for voting!</div>
            </div>
          )}
        </div>
      )}
      <button className="blog-like-btn" onClick={handleLike}>Like ({likes})</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <CommentSection comments={post.comments} blogPostId={post._id} onCommentAdded={onPostUpdated} />
    </div>
  );
}
