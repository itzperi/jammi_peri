export interface ForumPost {
    id: string;
    author: string;
    specialty: string;
    category: string;
    title: string;
    content: string;
    upvotes: number;
    comments: number;
    commentsList?: { id: string, author: string, content: string, timestamp: string }[];
    status: 'approved' | 'pending';
    timestamp: string;
}

export interface FederationStore {
    posts: ForumPost[];
    isAdminLoggedIn: boolean;
    sanctumModalOpen: boolean;
    footerClickCount: number;

    // Actions
    approvePost: (id: string) => Promise<void>;
    rejectPost: (id: string) => Promise<void>;
    submitPost: (post: Omit<ForumPost, 'id' | 'upvotes' | 'comments' | 'commentsList' | 'status' | 'timestamp'>) => Promise<void>;
    upvotePost: (id: string) => Promise<void>;
    submitComment: (postId: string, commentData: { author: string, content: string }) => Promise<void>;
    loginAdmin: (username: string, pass: string) => Promise<boolean>;
    logoutAdmin: () => Promise<void>;
    incrementFooterClick: () => void;
    closeSanctumModal: () => void;
}
