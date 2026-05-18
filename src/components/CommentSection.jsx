"use client";
import { useState, useRef } from 'react';
import { MessageSquare, Send, Heart, Reply, CornerDownRight, X } from 'lucide-react';
import { format } from 'date-fns';
import api from '@/utils/api';

export default function CommentSection({ task, onUpdate }) {
    const [commentContent, setCommentContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const inputRef = useRef(null);

    const comments = task.comments || [];
    
    const rootComments = comments.filter(c => !c.parentId);
    const getReplies = (parentId) => comments.filter(c => c.parentId === parentId);

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (!commentContent.trim()) return;
        setIsSubmitting(true);
        try {
            await api.post(`/api/tasks/${task.id}/comments`, { 
                content: commentContent,
                parentId: replyingTo ? replyingTo.id : null
            });
            setCommentContent('');
            setReplyingTo(null);
            onUpdate();
        } catch (error) {
            console.error("Lỗi:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLike = async (commentId) => {
        try {
            await api.put(`/api/tasks/${task.id}/comments/${commentId}/like`);
            onUpdate();
        } catch (error) {
            console.error("Lỗi thả tim:", error);
        }
    };

    const handleReplyClick = (comment) => {
        setReplyingTo(comment);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const CommentItem = ({ comment, isReply = false }) => (
        <div className={`flex gap-3 items-start animate-in fade-in ${isReply ? 'mt-3' : 'mt-5'}`}>
            <img 
                src={`https://ui-avatars.com/api/?name=${comment.authorUsername}&background=random&color=fff&bold=true&size=32`} 
                alt="Avatar" 
                className={`${isReply ? 'w-6 h-6' : 'w-8 h-8'} rounded-full shadow-sm mt-1`}
            />
            <div className="flex-1">
                <div className="bg-gray-50 border border-gray-100 p-3 rounded-2xl rounded-tl-sm">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] font-bold text-gray-800">{comment.authorUsername}</span>
                        <span className="text-[10px] text-gray-400">
                            {comment.createdAt ? format(new Date(comment.createdAt), 'dd/MM/yyyy HH:mm') : 'Vừa xong'}
                        </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {comment.content}
                    </p>
                </div>
                
                <div className="flex items-center gap-4 mt-1 ml-2">
                    <button 
                        onClick={() => handleLike(comment.id)} 
                        className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <Heart size={12} className={comment.likesCount > 0 ? "fill-red-500 text-red-500" : ""} />
                        {comment.likesCount > 0 && <span>{comment.likesCount}</span>}
                        {comment.likesCount === 0 && <span>Thích</span>}
                    </button>
                    
                    {!isReply && (
                        <button 
                            onClick={() => handleReplyClick(comment)}
                            className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-blue-600 transition-colors"
                        >
                            <Reply size={12} /> Phản hồi
                        </button>
                    )}
                </div>

                {!isReply && getReplies(comment.id).length > 0 && (
                    <div className="pl-4 mt-2 border-l-2 border-gray-100">
                        {getReplies(comment.id).map(reply => (
                            <CommentItem key={reply.id} comment={reply} isReply={true} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="mt-8 border-t border-gray-100 pt-6 mb-10">
            <div className="flex items-center gap-2 text-gray-800 font-bold mb-4">
                <MessageSquare size={18} />
                <h3>Thảo luận nhóm ({comments.length})</h3>
            </div>

            <div className="mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {rootComments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}
                {comments.length === 0 && (
                    <div className="text-center py-8 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
                        <p className="text-sm text-gray-400">Chưa có bình luận nào. Hãy bắt đầu cuộc trò chuyện!</p>
                    </div>
                )}
            </div>

            <div className="bg-white sticky bottom-0 pt-2">
                {replyingTo && (
                    <div className="flex items-center justify-between bg-blue-50 text-blue-700 px-3 py-1.5 rounded-t-lg text-xs font-medium border border-blue-100 border-b-0">
                        <div className="flex items-center gap-1.5">
                            <CornerDownRight size={14} /> Đang trả lời <b>{replyingTo.authorUsername}</b>
                        </div>
                        <button onClick={() => setReplyingTo(null)} className="hover:text-red-500"><X size={14} /></button>
                    </div>
                )}

                <form onSubmit={handleSendComment} className={`flex gap-3 items-end bg-gray-50 border p-2 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all ${replyingTo ? 'rounded-b-xl border-blue-100' : 'rounded-xl border-gray-200'}`}>
                    <textarea 
                        ref={inputRef}
                        rows={1}
                        placeholder={replyingTo ? "Viết câu trả lời..." : "Viết bình luận..."}
                        className="flex-1 bg-transparent border-none outline-none resize-none text-sm p-2 text-gray-800 placeholder:text-gray-400 focus:ring-0 min-h-[40px] max-h-[120px]"
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendComment(e);
                            }
                        }}
                    />
                    <button 
                        type="submit"
                        disabled={!commentContent.trim() || isSubmitting}
                        className="bg-black text-white p-2.5 mb-0.5 rounded-lg hover:bg-neutral-800 transition-all shadow-sm active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
                    >
                        <Send size={16} />
                    </button>
                </form>
            </div>
        </div>
    );
}
