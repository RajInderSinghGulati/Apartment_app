import React from "react";
import EntryHistoryList from "../components/EntryHistory/EntryHistoryList";

export default function EntryHistoryPage() {
  return (
    <div className="udash-bg">
      <div className="udash-container">
        <h2 className="udash-section-title">Entry History</h2>
        <EntryHistoryList />
      </div>
    </div>
  );
}
