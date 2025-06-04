import React from "react";
import PostCard from "./PostCard";
import NewPostModal from "./NewPostModal";

// Dummy posts
const posts = [
  {
    id: 1,
    author: "John Doe",
    apartment: "Sunshine Residency",
    content: "Join us for a Diwali party this Saturday!",
    likes: 4,
    comments: [
      { id: 1, author: "Jane", text: "Sounds fun!" }
    ]
  },
  {
    id: 2,
    author: "Priya Singh",
    apartment: "Green Meadows",
    content: "Yoga session in the garden at 6am.",
    likes: 2,
    comments: []
  }
];

function BlogFeed() {
  return (
    <div>
      <NewPostModal />
      <div>
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default BlogFeed;
