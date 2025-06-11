import React, { useState } from "react";
import { createBlog } from "../../api/blogs"; // Import your API function

export default function NewPostModal({ onPostCreated }) {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [mediaFile, setMediaFile] = useState(null);
  const [isPoll, setIsPoll] = useState(false);
  const [pollQ, setPollQ] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setMediaFile(file);
    if (file.type.startsWith("image/")) {
      setMedia(URL.createObjectURL(file));
      setMediaType("image");
    } else if (file.type.startsWith("video/")) {
      setMedia(URL.createObjectURL(file));
      setMediaType("video");
    }
  };

  const handleOptionChange = (i, val) => {
    const next = [...pollOptions];
    next[i] = val;
    setPollOptions(next);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let formData = new FormData();
      formData.append("content", content);
      if (mediaFile) {
        formData.append("media", mediaFile);
        formData.append("mediaType", mediaType);
      }
      if (isPoll) {
        formData.append("pollQ", pollQ);
        pollOptions.forEach((opt, idx) => {
          formData.append(`pollOptions[${idx}]`, opt);
        });
      }

      // The backend should handle multipart/form-data for media uploads
      const res = await createBlog(formData);

      setLoading(false);
      setOpen(false);
      setContent("");
      setMedia(null);
      setMediaFile(null);
      setMediaType(null);
      setIsPoll(false);
      setPollQ("");
      setPollOptions(["", ""]);
      if (onPostCreated) onPostCreated(res.data);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || "Failed to create post");
    }
  };

  return (
    <div>
      <button className="blog-newpost-btn" onClick={() => setOpen(true)}>
        + New Post
      </button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="blog-section-title">Create New Post</h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <textarea
                placeholder="What's on your mind?"
                rows={4}
                value={content}
                onChange={e => setContent(e.target.value)}
                required
              />
              <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
              {media && mediaType === "image" && (
                <img src={media} alt="Preview" className="blog-post-media" style={{ marginTop: 8 }} />
              )}
              {media && mediaType === "video" && (
                <video className="blog-post-media" controls style={{ marginTop: 8 }}>
                  <source src={media} />
                </video>
              )}
              <label style={{ display: "block", margin: "1em 0 0.3em 0" }}>
                <input type="checkbox" checked={isPoll} onChange={e => setIsPoll(e.target.checked)} /> Add a poll
              </label>
              {isPoll && (
                <div style={{ marginBottom: 8 }}>
                  <input
                    type="text"
                    placeholder="Poll question"
                    value={pollQ}
                    onChange={e => setPollQ(e.target.value)}
                    style={{ marginBottom: 8 }}
                  />
                  {pollOptions.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={e => handleOptionChange(i, e.target.value)}
                      style={{ marginBottom: 6 }}
                    />
                  ))}
                  <button
                    type="button"
                    style={{ background: "var(--accent)", marginTop: 4 }}
                    onClick={() => setPollOptions([...pollOptions, ""])}
                  >
                    + Add Option
                  </button>
                </div>
              )}
              {error && <div style={{ color: "red" }}>{error}</div>}
              <div style={{ marginTop: "1rem", display: "flex", gap: "1em" }}>
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={{ background: "var(--primary)" }} disabled={loading}>
                  {loading ? "Posting..." : "Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
