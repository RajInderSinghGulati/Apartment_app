import React, { useState } from "react";

function HireStaffModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Hire Staff</button>
      {open && (
        <div className="modal">
          <div className="modal-content">
            <h3>Hire New Staff</h3>
            <form>
              <input type="text" placeholder="Name" />
              <input type="text" placeholder="Role" />
              <div style={{ marginTop: "1rem" }}>
                <button type="button" onClick={() => setOpen(false)}>Cancel</button>
                <button type="submit" style={{ marginLeft: "1rem" }}>Hire</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default HireStaffModal;
