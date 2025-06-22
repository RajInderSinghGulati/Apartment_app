import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import NewPostModal from "./NewPostModal";
import { fetchBlogs } from "../../api/blogs"; // <-- Import your API function

export default function BlogFeed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBlogs()
      .then(res => setPosts(res.data))
      .catch(err => setError(err.response?.data?.error || "Error loading posts"));
  }, []);

  return (
    <div>
      <NewPostModal />
      {error && <div style={{ color: "red" }}>{error}</div>}
      {posts.map(post => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
