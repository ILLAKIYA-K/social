import React, { useState } from 'react';
import { db, auth } from '../firebase-config';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const CreatePost = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const handlePost = async () => {
    try {
      const postRef = collection(db, 'posts');
      await addDoc(postRef, {
        text,
        image,
        video,
        user: auth.currentUser.email,
        timestamp: Timestamp.now(),
      });
      setText('');
      setImage(null);
      setVideo(null);
    } catch (error) {
      console.error('Error creating post', error);
    }
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?" />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files[0])} />
      <button onClick={handlePost}>Post</button>
    </div>
  );
};

export default CreatePost;
