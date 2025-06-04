import React, { useState } from "react";


function NewPostModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>New Post</button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create New Post</h3>
            <form>
              <textarea placeholder="What's on your mind?" rows={4} style={{ width: "100%" }} />
              <div style={{ marginTop: "1rem" }}>
                <button type="button" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" style={{ marginLeft: "1rem" }}>Post</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPostModal;
