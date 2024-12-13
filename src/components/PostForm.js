import React, { useState } from 'react';
import { auth, db, storage } from '../firebase/firebase-config'; // Ensure storage is imported
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import storage functions
import './PostForm.css';

const PostForm = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  // Upload file to Firebase Storage and return its URL
  const uploadFile = async (file, path) => {
    const storageRef = ref(storage, path);  // Path in Firebase Storage
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        null, // We can skip the progress handler
        (error) => reject(error), // Handle upload errors
        () => {
          // Get file URL once upload is complete
          getDownloadURL(uploadTask.snapshot.ref).then(resolve);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const imageUrls = [];
      const videoUrl = video ? await uploadFile(video, `posts/videos/${Date.now()}.mp4`) : null;

      // Upload each image
      for (let i = 0; i < images.length; i++) {
        const imageUrl = await uploadFile(images[i], `posts/images/${Date.now()}_${i}.jpg`);
        imageUrls.push(imageUrl);
      }

      // Add post data to Firestore
      await addDoc(collection(db, "posts"), {
        text,
        imageUrls,  // Array of uploaded image URLs
        videoUrl,    // Video URL
        timestamp: serverTimestamp(),  // Firebase server timestamp
        username: "User Name",  // Replace with actual user data
        profilePicture: "profile_pic_url",  // Replace with actual user data
      });

      // Reset form fields
      setText('');
      setImages([]);
      setVideo(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What's on your mind?"
        rows="4"
      />
      <input type="file" multiple onChange={handleImageChange} />
      <input type="file" onChange={handleVideoChange} />
      <button type="submit">Post</button>
    </form>
  );
};

export default PostForm;
