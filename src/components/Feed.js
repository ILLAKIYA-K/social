// /src/components/Feed.js
// /src/components/Feed.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit, startAfter } from 'firebase/firestore';
import { auth, db } from '../firebase/firebase-config';  // Ensure this is the only place it's imported.
import Post from './Post';
import './Feed.css';



const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);

  const fetchPosts = async () => {
    const postsCol = collection(db, "posts");
    const postsQuery = query(
      postsCol,
      orderBy("timestamp", "desc"),
      limit(20)
    );

    const snapshot = await getDocs(postsQuery);
    const fetchedPosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(fetchedPosts);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadMorePosts = async () => {
    const postsCol = collection(db, "posts");
    const postsQuery = query(
      postsCol,
      orderBy("timestamp", "desc"),
      startAfter(lastVisible),
      limit(20)
    );

    const snapshot = await getDocs(postsQuery);
    const morePosts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(prevPosts => [...prevPosts, ...morePosts]);
    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
  };

  return (
    <div className="feed">
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      <button onClick={loadMorePosts}>Load More</button>
    </div>
  );
};

export default Feed;
