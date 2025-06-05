import React, { useState } from "react";

export default function HireStaffModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button className="staff-hire-btn" onClick={() => setOpen(true)}>
        + Hire Staff
      </button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="udash-section-title">Hire New Staff</h3>
            <form>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Role" />
              <div style={{ marginTop: "1rem", display: "flex", gap: "1em" }}>
                <button type="button" onClick={() => setOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={{ background: "var(--primary)" }}>
                  Hire
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
