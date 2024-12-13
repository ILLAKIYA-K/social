// /src/components/Post.js
// /src/components/Post.js
import React from 'react';
import './Post.css';

const Post = ({ post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <img src={post.profilePicture} alt="profile" className="profile-img" />
        <span>{post.username}</span>
      </div>
      <p>{post.text}</p>
      {post.imageUrls && post.imageUrls.map((url, index) => (
        <img key={index} src={url} alt="post" className="post-image" />
      ))}
      {post.videoUrl && (
        <video controls className="post-video" src={post.videoUrl} />
      )}
      <span>{new Date(post.timestamp.seconds * 1000).toLocaleString()}</span>
    </div>
  );
};

export default Post;
