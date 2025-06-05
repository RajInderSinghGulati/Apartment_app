import React from "react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      className="blog-comment-input"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      style={{
        maxWidth: 240,
        border: "2px solid var(--accent-light)",
        background: "#fff"
      }}
    />
  );
}
