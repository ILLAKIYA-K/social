// /src/components/Profile.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import '../styles/Profile.css'; 

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setUserData(userDoc.data());
      }
    };

    const fetchUserPosts = async () => {
      const user = auth.currentUser;
      if (user) {
        const postsSnapshot = await getDocs(
          query(collection(db, 'posts'), where('userId', '==', user.uid))
        );
        const postsData = postsSnapshot.docs.map(doc => doc.data());
        setPosts(postsData);
      }
    };

    onAuthStateChanged(auth, fetchUserData);
    fetchUserPosts();
  }, []);

  return (
    <div className="profile">
      {userData && (
        <>
          <img src={userData.profilePicture} alt="Profile" className="profile-img" />
          <h2>{userData.username}</h2>
          <p>{userData.bio}</p>
        </>
      )}
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="user-post">
            <p>{post.text}</p>
            {post.imageUrls && post.imageUrls.map((url, i) => (
              <img key={i} src={url} alt="user-post" className="user-post-img" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
