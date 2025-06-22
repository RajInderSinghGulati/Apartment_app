import React, { useState } from "react"
import Layout from "@/components/Layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Trash2,
  Plus,
  Heart,
  MessageSquare,
  Image,
  Video,
  BarChart3
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

const Blog = () => {
  const navigate = useNavigate()
  const userRole = localStorage.getItem("userRole")
  const isAdmin = userRole === "admin"
  const currentUser = "John Doe" // This would come from auth context
  const currentHouse = "A-101" // This would come from user profile

  const [blogPosts, setBlogPosts] = useState([
    {
      id: 1,
      title: "Community Update",
      content:
        "Welcome to our new social community platform! Share your thoughts, photos, and connect with neighbors.",
      timestamp: new Date(),
      author: "Admin",
      houseNumber: "Admin",
      type: "text",
      likes: 12,
      comments: [],
      likedBy: []
    },
    {
      id: 2,
      title: "Beautiful Sunset",
      content: "Caught this amazing sunset from my balcony today!",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      author: "Sarah Johnson",
      houseNumber: "B-205",
      type: "image",
      media: "/placeholder.svg",
      likes: 8,
      comments: [
        {
          id: 1,
          author: "Mike Chen",
          content: "Gorgeous view! Lucky you!",
          timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
          houseNumber: "A-303"
        }
      ],
      likedBy: []
    }
  ])

  const [showCreatePost, setShowCreatePost] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    type: "text",
    media: "",
    pollOptions: ["", ""]
  })
  const [newComment, setNewComment] = useState({})

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    navigate("/login")
  }

  const createPost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return

    const post = {
      id: Date.now(),
      title: newPost.title,
      content: newPost.content,
      timestamp: new Date(),
      author: currentUser,
      houseNumber: currentHouse,
      type: newPost.type,
      media: newPost.media || undefined,
      pollOptions:
        newPost.type === "poll"
          ? newPost.pollOptions.filter(opt => opt.trim())
          : undefined,
      pollVotes:
        newPost.type === "poll"
          ? new Array(
              newPost.pollOptions.filter(opt => opt.trim()).length
            ).fill(0)
          : undefined,
      likes: 0,
      comments: [],
      likedBy: []
    }

    setBlogPosts(posts => [post, ...posts])
    setNewPost({
      title: "",
      content: "",
      type: "text",
      media: "",
      pollOptions: ["", ""]
    })
    setShowCreatePost(false)
  }

  const deletePost = id => {
    setBlogPosts(posts => posts.filter(post => post.id !== id))
  }

  const toggleLike = postId => {
    setBlogPosts(posts =>
      posts.map(post => {
        if (post.id === postId) {
          const hasLiked = post.likedBy.includes(currentUser)
          return {
            ...post,
            likes: hasLiked ? post.likes - 1 : post.likes + 1,
            likedBy: hasLiked
              ? post.likedBy.filter(user => user !== currentUser)
              : [...post.likedBy, currentUser]
          }
        }
        return post
      })
    )
  }

  const addComment = postId => {
    const commentText = newComment[postId]?.trim()
    if (!commentText) return

    const comment = {
      id: Date.now(),
      author: currentUser,
      content: commentText,
      timestamp: new Date(),
      houseNumber: currentHouse
    }

    setBlogPosts(posts =>
      posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment]
          }
        }
        return post
      })
    )

    setNewComment(prev => ({ ...prev, [postId]: "" }))
  }

  const votePoll = (postId, optionIndex) => {
    setBlogPosts(posts =>
      posts.map(post => {
        if (post.id === postId && post.pollVotes) {
          const newVotes = [...post.pollVotes]
          newVotes[optionIndex]++
          return { ...post, pollVotes: newVotes }
        }
        return post
      })
    )
  }

  const addPollOption = () => {
    setNewPost(prev => ({
      ...prev,
      pollOptions: [...prev.pollOptions, ""]
    }))
  }

  return (
    <Layout isAdmin={isAdmin} onLogout={handleLogout}>
      <div className="space-y-4 md:space-y-6 px-2 md:px-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Community Feed
          </h1>
          <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl mx-4 md:mx-auto max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPost.title}
                    onChange={e =>
                      setNewPost(prev => ({ ...prev, title: e.target.value }))
                    }
                    placeholder="What's happening?"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={newPost.type === "text" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setNewPost(prev => ({ ...prev, type: "text" }))
                    }
                    className="flex-1 sm:flex-none"
                  >
                    Text
                  </Button>
                  <Button
                    variant={newPost.type === "image" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setNewPost(prev => ({ ...prev, type: "image" }))
                    }
                    className="flex-1 sm:flex-none"
                  >
                    <Image className="h-4 w-4 mr-1" />
                    Image
                  </Button>
                  <Button
                    variant={newPost.type === "video" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setNewPost(prev => ({ ...prev, type: "video" }))
                    }
                    className="flex-1 sm:flex-none"
                  >
                    <Video className="h-4 w-4 mr-1" />
                    Video
                  </Button>
                  <Button
                    variant={newPost.type === "poll" ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setNewPost(prev => ({ ...prev, type: "poll" }))
                    }
                    className="flex-1 sm:flex-none"
                  >
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Poll
                  </Button>
                </div>

                {(newPost.type === "image" || newPost.type === "video") && (
                  <div>
                    <Label htmlFor="media">Media URL</Label>
                    <Input
                      id="media"
                      value={newPost.media}
                      onChange={e =>
                        setNewPost(prev => ({ ...prev, media: e.target.value }))
                      }
                      placeholder="Enter image or video URL"
                    />
                  </div>
                )}

                {newPost.type === "poll" && (
                  <div>
                    <Label>Poll Options</Label>
                    {newPost.pollOptions.map((option, index) => (
                      <Input
                        key={index}
                        value={option}
                        onChange={e => {
                          const newOptions = [...newPost.pollOptions]
                          newOptions[index] = e.target.value
                          setNewPost(prev => ({
                            ...prev,
                            pollOptions: newOptions
                          }))
                        }}
                        placeholder={`Option ${index + 1}`}
                        className="mt-2"
                      />
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addPollOption}
                      className="mt-2 w-full sm:w-auto"
                    >
                      Add Option
                    </Button>
                  </div>
                )}

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newPost.content}
                    onChange={e =>
                      setNewPost(prev => ({ ...prev, content: e.target.value }))
                    }
                    placeholder="Share your thoughts..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    onClick={createPost}
                    className="bg-gradient-to-r from-green-400 to-teal-500 flex-1 sm:flex-none"
                  >
                    Post
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreatePost(false)}
                    className="flex-1 sm:flex-none"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-4 md:space-y-6">
          {blogPosts.map(post => (
            <Card
              key={post.id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 break-words">
                      {post.title}
                    </h2>
                    <div className="text-xs md:text-sm text-gray-500 flex flex-wrap items-center gap-1">
                      <span className="font-medium">{post.author}</span>
                      {post.houseNumber !== "Admin" && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="sm:hidden">,</span>
                          <span>House {post.houseNumber}</span>
                        </>
                      )}
                      <span className="hidden sm:inline">•</span>
                      <span className="sm:hidden">,</span>
                      <span>{post.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                  {(isAdmin || post.author === currentUser) && (
                    <Button
                      onClick={() => deletePost(post.id)}
                      variant="destructive"
                      size="sm"
                      className="shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-700 break-words">{post.content}</p>

                {post.type === "image" && post.media && (
                  <img
                    src={post.media}
                    alt="Post image"
                    className="w-full h-48 md:h-64 object-cover rounded-lg"
                  />
                )}

                {post.type === "video" && post.media && (
                  <video
                    src={post.media}
                    controls
                    className="w-full h-48 md:h-64 rounded-lg"
                  />
                )}

                {post.type === "poll" && post.pollOptions && post.pollVotes && (
                  <div className="space-y-2">
                    {post.pollOptions.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => votePoll(post.id, index)}
                          className="flex-1 justify-between text-left h-auto py-2 px-3"
                        >
                          <span className="truncate">{option}</span>
                          <span className="font-medium ml-2 shrink-0">
                            {post.pollVotes[index]} votes
                          </span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2 md:gap-4 pt-2 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 ${
                      post.likedBy.includes(currentUser)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        post.likedBy.includes(currentUser) ? "fill-current" : ""
                      }`}
                    />
                    <span className="text-xs md:text-sm">{post.likes}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-gray-500"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs md:text-sm">
                      {post.comments.length}
                    </span>
                  </Button>
                </div>

                {post.comments.length > 0 && (
                  <div className="space-y-3 pt-3 border-t">
                    {post.comments.map(comment => (
                      <div
                        key={comment.id}
                        className="bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
                          <span className="font-medium text-sm text-gray-900">
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            House {comment.houseNumber} •{" "}
                            {comment.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 break-words">
                          {comment.content}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <Input
                    placeholder="Write a comment..."
                    value={newComment[post.id] || ""}
                    onChange={e =>
                      setNewComment(prev => ({
                        ...prev,
                        [post.id]: e.target.value
                      }))
                    }
                    className="flex-1"
                  />
                  <Button
                    onClick={() => addComment(post.id)}
                    size="sm"
                    className="bg-gradient-to-r from-green-400 to-teal-500 w-full sm:w-auto"
                  >
                    Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Blog
