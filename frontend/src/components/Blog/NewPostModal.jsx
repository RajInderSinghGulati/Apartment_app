import React, { useState } from "react";

export default function NewPostModal() {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState(null);
  const [mediaType, setMediaType] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.startsWith("image/")) {
      setMedia(URL.createObjectURL(file));
      setMediaType("image");
    } else if (file.type.startsWith("video/")) {
      setMedia(URL.createObjectURL(file));
      setMediaType("video");
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
            <form>
              <textarea placeholder="What's on your mind?" rows={4} />
              <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
              {media && mediaType === "image" && (
                <img src={media} alt="Preview" className="blog-post-media" style={{ marginTop: 8 }} />
              )}
              {media && mediaType === "video" && (
                <video className="blog-post-media" controls style={{ marginTop: 8 }}>
                  <source src={media} />
                </video>
              )}
              <div style={{ marginTop: "1rem", display: "flex", gap: "1em" }}>
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={{ background: "var(--primary)" }}>
                  Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
