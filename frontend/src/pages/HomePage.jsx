import React from "react";
import BlogFeed from "../components/Blog/BlogFeed";

export default function HomePage() {
  return (
    <div className="udash-bg">
      <div className="udash-container">
        <h2 className="blog-section-title">Community Blog</h2>
        <BlogFeed />
      </div>
    </div>
  );
}
