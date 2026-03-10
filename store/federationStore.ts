import { create } from 'zustand';
import { FederationStore, ForumPost } from '../types/federation';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, query, orderBy } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useFederationStore = create<FederationStore>((set, get) => {
    // Initialize Firestore listener for posts if db is available
    if (db) {
        const postsQuery = query(collection(db, 'federation_posts'), orderBy('timestamp', 'desc'));
        onSnapshot(postsQuery, (snapshot) => {
            const posts: ForumPost[] = [];
            snapshot.forEach((doc) => {
                posts.push({ id: doc.id, ...doc.data() } as ForumPost);
            });
            set({ posts });
        }, (error) => {
            console.error("Error fetching posts:", error);
        });
    }

    // Initialize Auth listener if auth is available
    if (auth) {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                set({ isAdminLoggedIn: true, sanctumModalOpen: false });
            } else {
                set({ isAdminLoggedIn: false });
            }
        });
    }

    return {
        posts: [],
        isAdminLoggedIn: false,
        sanctumModalOpen: false,
        footerClickCount: 0,

        approvePost: async (id) => {
            try {
                const postRef = doc(db, 'federation_posts', id);
                await updateDoc(postRef, { status: 'approved' });
            } catch (error) {
                console.error("Error approving post:", error);
            }
        },
        
        rejectPost: async (id) => {
            try {
                const postRef = doc(db, 'federation_posts', id);
                await deleteDoc(postRef);
            } catch (error) {
                console.error("Error rejecting post:", error);
            }
        },

        submitPost: async (postData) => {
            try {
                const newPost = {
                    ...postData,
                    upvotes: 0,
                    comments: 0,
                    commentsList: [],
                    status: 'pending',
                    timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
                };
                await addDoc(collection(db, 'federation_posts'), newPost);
            } catch (error) {
                console.error("Error submitting post:", error);
            }
        },

        upvotePost: async (id) => {
            try {
                const post = get().posts.find(p => p.id === id);
                if (post) {
                    const postRef = doc(db, 'federation_posts', id);
                    await updateDoc(postRef, { upvotes: post.upvotes + 1 });
                }
            } catch (error) {
                console.error("Error upvoting post:", error);
            }
        },

        submitComment: async (postId, commentData) => {
            try {
                const post = get().posts.find(p => p.id === postId);
                if (post) {
                    const newComment = {
                        id: crypto.randomUUID(),
                        author: commentData.author,
                        content: commentData.content,
                        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).toUpperCase(),
                    };
                    const updatedCommentsList = post.commentsList ? [...post.commentsList, newComment] : [newComment];
                    const postRef = doc(db, 'federation_posts', postId);
                    await updateDoc(postRef, { 
                        comments: post.comments + 1,
                        commentsList: updatedCommentsList
                    });
                }
            } catch (error) {
                console.error("Error submitting comment:", error);
            }
        },

        loginAdmin: async (username, pass) => {
            try {
                // Assuming username is an email address here since Firebase uses email/password
                const email = username.includes('@') ? username : `${username}@jammi.com`;
                await signInWithEmailAndPassword(auth, email, pass);
                return true;
            } catch (error) {
                console.error("Error logging in:", error);
                return false;
            }
        },

        logoutAdmin: async () => {
            try {
                await signOut(auth);
            } catch (error) {
                console.error("Error logging out:", error);
            }
        },

        incrementFooterClick: () => {
            const { footerClickCount } = get();
            const newCount = footerClickCount + 1;
            if (newCount >= 3) {
                set({ footerClickCount: 0, sanctumModalOpen: true });
            } else {
                set({ footerClickCount: newCount });
            }
        },

        closeSanctumModal: () => set({ sanctumModalOpen: false, footerClickCount: 0 })
    };
});
