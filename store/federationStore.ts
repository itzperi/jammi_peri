import { create } from 'zustand';
import { FederationStore, ForumPost, DoctorProfile, PartnerRequest, Notification, Product } from '../types/federation';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, query, orderBy, getDoc, runTransaction, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const useFederationStore = create<FederationStore>((set, get) => {
    // Initialize Firestore listeners
    if (db) {
        // Posts Listener
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

        // Doctor Profiles Listener
        const doctorsQuery = query(collection(db, 'doctor_profiles'), orderBy('timestamp', 'desc'));
        onSnapshot(doctorsQuery, (snapshot) => {
            const doctorProfiles: DoctorProfile[] = [];
            snapshot.forEach((doc) => {
                doctorProfiles.push({ id: doc.id, ...doc.data() } as DoctorProfile);
            });
            set({ doctorProfiles });
        });

        // Partner Requests Listener
        const partnersQuery = query(collection(db, 'partner_requests'), orderBy('timestamp', 'desc'));
        onSnapshot(partnersQuery, (snapshot) => {
            const partnerRequests: PartnerRequest[] = [];
            snapshot.forEach((doc) => {
                partnerRequests.push({ id: doc.id, ...doc.data() } as PartnerRequest);
            });
            set({ partnerRequests });
        });

        // Notifications Listener
        const notificationsQuery = query(collection(db, 'federation_notifications'), orderBy('timestamp', 'desc'));
        onSnapshot(notificationsQuery, (snapshot) => {
            const notifications: Notification[] = [];
            snapshot.forEach((doc) => {
                notifications.push({ id: doc.id, ...doc.data() } as Notification);
            });
            set({ notifications });
        });

        // Customers Listener
        const customersQuery = query(collection(db, 'customers'), orderBy('timestamp', 'desc'));
        onSnapshot(customersQuery, (snapshot) => {
            const customers: any[] = [];
            snapshot.forEach((doc) => {
                customers.push({ id: doc.id, ...doc.data() });
            });
            set({ customers });
        });

        // Products Listener
        const productsQuery = query(collection(db, 'products'), orderBy('category', 'asc'));
        onSnapshot(productsQuery, (snapshot) => {
            const products: Product[] = [];
            snapshot.forEach((doc) => {
                products.push({ id: doc.id, ...doc.data() } as Product);
            });
            set({ products });
        });
    }

    // Initialize Auth listener if auth is available
    if (auth && db) {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                set({ userUID: user.uid });
                // Simplified admin check - you might want to use custom claims in a real app
                if (user.email === 'admin@jammi.com') {
                    set({ isAdminLoggedIn: true, sanctumModalOpen: false });
                }
                
                // Always try to fetch profile if logged in
                const docRef = doc(db, 'doctor_profiles', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    set({ currentUserProfile: { id: docSnap.id, ...docSnap.data() } as DoctorProfile });
                }
            } else {
                set({ isAdminLoggedIn: false, userUID: null, currentUserProfile: null });
            }
        });
    }

    return {
        posts: [],
        doctorProfiles: [],
        partnerRequests: [],
        customers: [],
        products: [],
        notifications: [],
        isAdminLoggedIn: false,
        currentUserProfile: null,
        userUID: null,
        sanctumModalOpen: false,
        footerClickCount: 0,

        approvePost: async (id) => {
            try {
                const postRef = doc(db, 'federation_posts', id);
                await updateDoc(postRef, { status: 'approved' });
                
                // Notify users that a doctor has posted
                const post = get().posts.find(p => p.id === id);
                if (post) {
                    await addDoc(collection(db, 'federation_notifications'), {
                        type: 'new_post',
                        message: `${post.author} has posted: ${post.title}`,
                        timestamp: new Date().toISOString(),
                        isRead: false,
                        link: '/federation'
                    });
                }
            } catch (error) {
                console.error("Error approving post:", error);
            }
        },
        
        rejectPost: async (id) => {
            try {
                const postRef = doc(db, 'federation_posts', id);
                await updateDoc(postRef, { status: 'rejected' });
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

        // Doctor Actions
        createDoctorProfile: async (profileData) => {
            const { userUID } = get();
            try {
                const newProfile = {
                    ...profileData,
                    verified: false,
                    timestamp: new Date().toISOString(),
                };
                if (userUID && db) {
                    await setDoc(doc(db, 'doctor_profiles', userUID), newProfile);
                    // Update local state immediately for better UX
                    set({ currentUserProfile: { id: userUID, ...newProfile } as DoctorProfile });
                } else if (db) {
                    await addDoc(collection(db, 'doctor_profiles'), newProfile);
                }
            } catch (error) {
                console.error("Error creating doctor profile:", error);
            }
        },

        verifyDoctor: async (id) => {
            try {
                if (!db) return;
                const docRef = doc(db, 'doctor_profiles', id);
                await updateDoc(docRef, { verified: true });
                
                const profile = get().doctorProfiles.find(p => p.id === id);
                if (profile) {
                    await addDoc(collection(db, 'federation_notifications'), {
                        type: 'doctor_joined',
                        message: `${profile.name} has joined the Federation Community.`,
                        timestamp: new Date().toISOString(),
                        isRead: false,
                        link: '/federation'
                    });
                }
            } catch (error) {
                console.error("Error verifying doctor:", error);
            }
        },

        // Partner Actions
        submitPartnerRequest: async (requestData) => {
            try {
                if (!db) return;
                const newRequest = {
                    ...requestData,
                    status: 'pending',
                    timestamp: new Date().toISOString(),
                };
                await addDoc(collection(db, 'partner_requests'), newRequest);
            } catch (error) {
                console.error("Error submitting partner request:", error);
            }
        },

        verifyPartner: async (id) => {
            try {
                if (!db) return;
                const partnerRef = doc(db, 'partner_requests', id);
                await updateDoc(partnerRef, { status: 'verified' });
            } catch (error) {
                console.error("Error verifying partner:", error);
            }
        },

        markNotificationRead: async (id) => {
            try {
                if (!db) return;
                const notifRef = doc(db, 'federation_notifications', id);
                await updateDoc(notifRef, { isRead: true });
            } catch (error) {
                console.error("Error marking notification as read:", error);
            }
        },

        // Product Actions
        addProduct: async (productData) => {
            try {
                if (!db) return;
                const newProduct = {
                    ...productData,
                    timestamp: new Date().toISOString(),
                };
                await addDoc(collection(db, 'products'), newProduct);
            } catch (error) {
                console.error("Error adding product:", error);
            }
        },

        updateProduct: async (id, productData) => {
            try {
                if (!db) return;
                const productRef = doc(db, 'products', id);
                await updateDoc(productRef, {
                    ...productData,
                    updatedAt: new Date().toISOString()
                });
            } catch (error) {
                console.error("Error updating product:", error);
            }
        },

        deleteProduct: async (id) => {
            try {
                if (!db) return;
                const productRef = doc(db, 'products', id);
                await deleteDoc(productRef);
            } catch (error) {
                console.error("Error deleting product:", error);
            }
        },

        loginAdmin: async (username, pass) => {
            try {
                if (!auth) return false;
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
                if (auth) await signOut(auth);
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

        closeSanctumModal: () => set({ sanctumModalOpen: false, footerClickCount: 0 }),

        getNextCustomerID: async () => {
            try {
                if (!db) throw new Error("Firestore not initialized");
                const counterRef = doc(db, 'metadata', 'counters');
                const nextId = await runTransaction(db, async (transaction) => {
                    const counterDoc = await transaction.get(counterRef);
                    if (!counterDoc.exists()) {
                        transaction.set(counterRef, { customerId: 1 });
                        return 1;
                    }
                    const newId = (counterDoc.data().customerId || 0) + 1;
                    transaction.update(counterRef, { customerId: newId });
                    return newId;
                });
                return `customer-${nextId}`;
            } catch (error) {
                console.error("Error generating customer ID:", error);
                return `customer-${Math.floor(Math.random() * 10000)}`;
            }
        }
    };
});
