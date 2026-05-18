"use client";
import { MessageSquare, Paperclip, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function TaskCard({ task, provided, snapshot, onClick }) {
    const priorityColors = {
        URGENT: 'bg-red-100 text-red-700 border-red-200',
        HIGH: 'bg-orange-100 text-orange-700 border-orange-200',
        MEDIUM: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        LOW: 'bg-blue-100 text-blue-700 border-blue-200'
    };

    const prioClass = priorityColors[task.priority] || priorityColors.MEDIUM;

    return (
        <div
            onClick={onClick}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`relative bg-white rounded-xl p-4 transition-all duration-200 ease-out outline-none
                ${snapshot.isDragging 
                    ? 'ring-2 ring-blue-500 shadow-2xl rotate-3 scale-105 z-50 cursor-grabbing' 
                    : 'ring-1 ring-gray-900/5 shadow-sm hover:shadow-md hover:ring-gray-900/15 cursor-pointer'
                }
            `}
        >
            <div className="flex justify-between items-center mb-2.5">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider ${prioClass}`}>
                    {task.priority || 'MEDIUM'}
                </span>
                <span className="text-xs font-medium text-gray-400">TSK-{task.id}</span>
            </div>

            <h4 className="text-[15px] font-semibold text-gray-900 mb-1.5 leading-snug">
                {task.title}
            </h4>
            
            {task.description && (
                <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                    {task.description}
                </p>
            )}

            <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100/80">
                <div className="flex items-center gap-3 text-gray-400">
                    {task.dueDate && (
                        <div className="flex items-center gap-1 text-[11px] font-medium" title="Hạn chót">
                            <Clock size={13} className={new Date(task.dueDate) < new Date() ? 'text-red-500' : ''} />
                            <span className={new Date(task.dueDate) < new Date() ? 'text-red-500' : ''}>
                                {format(new Date(task.dueDate), 'dd/MM')}
                            </span>
                        </div>
                    )}
                    {task.comments && task.comments.length > 0 && (
                        <div className="flex items-center gap-1 text-[11px] font-medium hover:text-gray-700 transition-colors">
                            <MessageSquare size={13} /> {task.comments.length}
                        </div>
                    )}
                    {task.attachments && task.attachments.length > 0 && (
                        <div className="flex items-center gap-1 text-[11px] font-medium hover:text-gray-700 transition-colors">
                            <Paperclip size={13} /> {task.attachments.length}
                        </div>
                    )}
                </div>

                <div className="flex -space-x-2 overflow-hidden">
                    <div 
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-gray-200"
                        title={`Thực hiện: ${task.assigneeUsername || 'Chưa giao'}`}
                    >
                        <img 
                            src={`https://ui-avatars.com/api/?name=${task.assigneeUsername || 'U'}&background=random&color=fff&font-size=0.4&bold=true`} 
                            alt="Avatar" 
                            className="rounded-full w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
