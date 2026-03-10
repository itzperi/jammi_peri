"use client";
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useFederationStore } from '../../store/federationStore';
import clsx from 'clsx';
import { ForumPost } from '../../types/federation';

export default function Forum() {
    const { posts, submitPost, upvotePost, isAdminLoggedIn, approvePost, rejectPost, submitComment } = useFederationStore();
    
    // Post Form States
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [category, setCategory] = useState('Clinical Research');
    const [toast, setToast] = useState('');

    // Expanded Post State
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
    
    // Comment Form State
    const [commentAuthor, setCommentAuthor] = useState('');
    const [commentContent, setCommentContent] = useState('');

    const { scrollYProgress } = useScroll();
    const backgroundColor = useTransform(
        scrollYProgress,
        [0.4, 0.6],
        ['#FAF8F2', '#FDF6E8']
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || !author || !specialty) return;
        submitPost({ title, content, author, specialty, category });
        setTitle('');
        setContent('');
        setAuthor('');
        setSpecialty('');
        setToast('Submitted for Council review');
        setTimeout(() => setToast(''), 3000);
    };

    const handleCommentSubmit = (e: React.FormEvent, postId: string) => {
        e.preventDefault();
        if (!commentAuthor || !commentContent) return;
        submitComment(postId, { author: commentAuthor, content: commentContent });
        setCommentAuthor('');
        setCommentContent('');
    };

    return (
        <motion.section 
            className="w-full py-24 px-6 md:px-12 lg:px-24"
            style={{ backgroundColor }}
        >
            <div className="max-w-7xl mx-auto mb-16">
                <h2 className="text-4xl md:text-[64px] font-['Cormorant_SC',serif] text-[#C9A84C] mb-2 leading-none">
                    THE DISCOURSE
                </h2>
                <p className="font-['Cinzel',serif] tracking-widest text-[#9E8E7E] text-sm md:text-base">
                    PEER-REVIEWED FORUM · CURATED BY THE JAMMI ACADEMIC COUNCIL
                </p>
            </div>

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                {/* 65% Left Feed */}
                <div className="flex-1 lg:w-[65%] flex flex-col gap-6">
                    <AnimatePresence>
                        {posts.map((post, i) => {
                            if (post.status === 'pending' && !isAdminLoggedIn) return null; // hide pending from public
                            
                            const isExpanded = expandedPostId === post.id;

                            return (
                                <motion.div 
                                    key={post.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={clsx(
                                        "bg-[#F0EBE1] border border-[#D4B896] relative group overflow-hidden cursor-pointer",
                                        post.status === 'approved' ? 'border-l-[3px] border-l-[#C9A84C]' : 'border-l-[3px] border-l-[#C4A882]',
                                        isExpanded ? 'shadow-lg' : 'hover:shadow-md transition-shadow'
                                    )}
                                    // Expand/collapse logic (only allow expanding if approved or admin viewing)
                                    onClick={() => !isExpanded && setExpandedPostId(post.id)}
                                >
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="font-['DM_Mono',monospace] text-xs text-[#9E8E7E] tracking-wider uppercase">
                                                {post.category} · {post.timestamp}
                                            </div>
                                            <div className={clsx(
                                                "font-['Cinzel',serif] text-[10px] tracking-widest px-2 py-1 rounded-sm flex items-center gap-2",
                                                post.status === 'approved' ? "text-[#C9A84C] bg-[#C9A84C]/10" : "text-[#D4B896] bg-[#D4B896]/10"
                                            )}>
                                                {post.status === 'approved' ? '✦ COUNCIL APPROVED' : '⏳ AWAITING REVIEW'}
                                                {isExpanded && (
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); setExpandedPostId(null); }}
                                                        className="text-slate-500 hover:text-slate-900 leading-none"
                                                    >
                                                        ✕
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-['Playfair_Display',serif] text-[#1C1411] mb-2">
                                            {post.title}
                                        </h3>
                                        
                                        <div className="flex items-center gap-2 mb-4 text-[#2C2420] font-['EB_Garamond',serif] italic">
                                            {post.author} 
                                            <span className="text-[#D4B896] not-italic text-sm">|</span> 
                                            <span className="font-['Cinzel',serif] text-xs not-italic">{post.specialty}</span>
                                        </div>

                                        {/* Preview / Full Content */}
                                        <div className="text-[#3a302a] font-['EB_Garamond',serif] text-lg leading-relaxed">
                                            {isExpanded ? (
                                                <div className="whitespace-pre-wrap">{post.content}</div>
                                            ) : (
                                                <div className="line-clamp-3 overflow-hidden text-[#5a4d46]">{post.content}</div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#D4B896]/30">
                                            <div className="flex gap-4">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); upvotePost(post.id); }}
                                                    className="flex items-center gap-1 text-[#8B6914] hover:text-[#C9A84C] transition-colors"
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">history_edu</span>
                                                    <span className="font-['DM_Mono',monospace] text-xs">{post.upvotes}</span>
                                                </button>
                                                <button 
                                                    className="flex items-center gap-1 text-[#9E8E7E] hover:text-[#1C1411] transition-colors"
                                                    onClick={(e) => { if(!isExpanded) { e.stopPropagation(); setExpandedPostId(post.id); } }}
                                                >
                                                    <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                                                    <span className="font-['DM_Mono',monospace] text-xs">{post.comments}</span>
                                                </button>
                                            </div>

                                            {/* Admin Actions */}
                                            {isAdminLoggedIn && post.status === 'pending' && (
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); approvePost(post.id); }}
                                                        className="px-3 py-1 border border-[#C9A84C] text-[#C9A84C] font-['Cinzel',serif] text-[10px] hover:bg-[#C9A84C] hover:text-white transition-colors"
                                                    >
                                                        APPROVE
                                                    </button>
                                                    <button 
                                                        onClick={(e) => { e.stopPropagation(); rejectPost(post.id); }}
                                                        className="px-3 py-1 border border-[#D4B896] text-[#D4B896] font-['Cinzel',serif] text-[10px] hover:bg-[#D4B896] hover:text-white transition-colors"
                                                    >
                                                        REJECT
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Threaded Comments Section */}
                                    <AnimatePresence>
                                        {isExpanded && post.status === 'approved' && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="bg-[#EBE4D5] border-t border-[#D4B896] p-6 cursor-default"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <h4 className="font-['Cinzel',serif] text-[#1C1411] tracking-widest mb-6">Discourse Thread</h4>
                                                
                                                {/* Comments List */}
                                                <div className="space-y-4 mb-8">
                                                    {post.commentsList && post.commentsList.length > 0 ? (
                                                        post.commentsList.map(comment => (
                                                            <div key={comment.id} className="bg-[#FAF8F2] p-4 rounded-sm border-l-2 border-[#C9A84C]">
                                                                <div className="flex justify-between items-center mb-2">
                                                                    <span className="font-['Playfair_Display',serif] font-bold text-[#1C1411]">{comment.author}</span>
                                                                    <span className="font-['DM_Mono',monospace] text-[10px] text-[#9E8E7E] uppercase">{comment.timestamp}</span>
                                                                </div>
                                                                <p className="font-['EB_Garamond',serif] text-[#3a302a] text-[15px]">{comment.content}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="font-['EB_Garamond',serif] text-[#9E8E7E] italic text-sm">No thoughts shared yet. Be the first to add to this discourse.</p>
                                                    )}
                                                </div>

                                                {/* Add Comment Form */}
                                                <div className="bg-[#FAF8F2] p-5 border border-[#D4B896]/30">
                                                    <h5 className="font-['Playfair_Display',serif] text-sm text-[#1C1411] mb-4">Contribute to the Discussion</h5>
                                                    <form onSubmit={(e) => handleCommentSubmit(e, post.id)} className="flex flex-col gap-4">
                                                        <input 
                                                            type="text" 
                                                            placeholder="Your Name / Title" 
                                                            value={commentAuthor}
                                                            onChange={e => setCommentAuthor(e.target.value)}
                                                            className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-sm focus:outline-none placeholder:text-[#9E8E7E]/70"
                                                            required
                                                        />
                                                        <textarea 
                                                            placeholder="Your Insight..." 
                                                            value={commentContent}
                                                            onChange={e => setCommentContent(e.target.value)}
                                                            className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-sm focus:outline-none placeholder:text-[#9E8E7E]/70 resize-none h-16"
                                                            required
                                                        />
                                                        <button type="submit" className="self-end px-6 py-2 border border-[#C9A84C] text-[#C9A84C] font-['Cinzel',serif] text-[10px] tracking-widest hover:bg-[#C9A84C] hover:text-white transition-colors">
                                                            ADD INSIGHT
                                                        </button>
                                                    </form>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                {/* 35% Right Sticky Sidebar */}
                <div className="w-full lg:w-[35%] lg:sticky top-24 self-start">
                    <div className="bg-[#EDE5D8] p-8 border-t-[3px] border-t-[double] border-t-[#C9A84C] relative">
                        <h3 className="text-3xl font-['Playfair_Display',serif] italic text-[#1C1411] mb-8">
                            Start a Discourse
                        </h3>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Title of Discourse" 
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70"
                                    required
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Author Name" 
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70"
                                    required
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group">
                                <input 
                                    type="text" 
                                    placeholder="Specialty / Affiliation" 
                                    value={specialty}
                                    onChange={e => setSpecialty(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70"
                                    required
                                />
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group">
                                <select 
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    className="w-full bg-transparent border-b border-[#9E8E7E] pb-2 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none appearance-none cursor-pointer"
                                >
                                    <option value="Clinical Research">Clinical Research</option>
                                    <option value="Case Study">Case Study</option>
                                    <option value="Herbology">Herbology</option>
                                    <option value="Discussion">Discussion</option>
                                </select>
                                <span className="absolute right-0 top-1 pointer-events-none material-symbols-outlined text-[#8B6914]">expand_more</span>
                                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#C9A84C] transition-all duration-300 group-focus-within:w-full"></span>
                            </div>

                            <div className="relative group mt-2">
                                <textarea 
                                    placeholder="Detailed Content..." 
                                    value={content}
                                    onChange={e => setContent(e.target.value)}
                                    className="w-full bg-transparent border border-[#9E8E7E]/50 p-3 text-[#1C1411] font-['EB_Garamond',serif] text-lg focus:outline-none placeholder:text-[#9E8E7E]/70 resize-none h-32"
                                    required
                                />
                            </div>

                            <button type="submit" className="w-full bg-[#1C1411] text-[#C9A84C] font-['Cinzel',serif] tracking-widest py-4 mt-2 hover:bg-[#0D0907] transition-colors">
                                SUBMIT FOR COUNCIL REVIEW
                            </button>
                        </form>

                        {/* Toast */}
                        {toast && (
                            <div className="absolute top-4 right-4 bg-white/90 px-4 py-2 border border-[#C9A84C] shadow-lg text-sm font-['Cinzel',serif] text-[#1C1411] animate-fade-in-up">
                                {toast}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
