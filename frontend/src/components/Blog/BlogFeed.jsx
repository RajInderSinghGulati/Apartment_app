import React from "react";
import PostCard from "./PostCard";
import NewPostModal from "./NewPostModal";

const posts = [
  {
    id: 1,
    author: "Priya",
    content: "Yoga session in the garden at 6am.",
    likes: 2,
    comments: [],
    media: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", // image url
    mediaType: "image"
  },
  {
    id: 2,
    author: "John",
    content: "Diwali party this Saturday!",
    likes: 4,
    comments: [{ author: "Jane", text: "Sounds fun!" }],
    media: "https://www.w3schools.com/html/mov_bbb.mp4", // video url
    mediaType: "video"
  }
];

export default function BlogFeed() {
  return (
    <div>
      <NewPostModal />
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
