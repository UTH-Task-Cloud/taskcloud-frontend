"use client";
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '@/utils/api';
import { Plus } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import CreateTaskModal from '@/components/CreateTaskModal';
import TaskDetailModal from '@/components/TaskDetailModal';

const COLUMN_ORDER = ['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE'];
const COLUMN_CONFIG = {
    TODO: { title: 'VIỆC CẦN LÀM', color: 'bg-gray-400' },
    IN_PROGRESS: { title: 'ĐANG TIẾN HÀNH', color: 'bg-blue-500' },
    REVIEW: { title: 'ĐANG ĐÁNH GIÁ', color: 'bg-orange-400' },
    DONE: { title: 'HOÀN THÀNH', color: 'bg-green-500' }
};

export default function DashboardPage() {
    const [tasks, setTasks] = useState({ TODO: [], IN_PROGRESS: [], REVIEW: [], DONE: [] });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/api/tasks');
            const data = response.data;
            
            const grouped = { TODO: [], IN_PROGRESS: [], REVIEW: [], DONE: [] };
            data.forEach(task => {
                if (grouped[task.status]) grouped[task.status].push(task);
            });
            setTasks(grouped);

            setSelectedTask(currentSelectedTask => {
                if (currentSelectedTask) {
                    return data.find(t => t.id === currentSelectedTask.id) || null;
                }
                return null;
            });
        } catch (error) {
            console.error("Lỗi tải data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        const sourceCol = source.droppableId;
        const destCol = destination.droppableId;
        
        const newTasks = { ...tasks };
        const [movedTask] = newTasks[sourceCol].splice(source.index, 1);
        movedTask.status = destCol;
        newTasks[destCol].splice(destination.index, 0, movedTask);
        setTasks(newTasks);

        try {
            await api.put(`/api/tasks/${draggableId}`, { status: destCol });
        } catch (error) {
            fetchTasks(); 
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col p-8 bg-white overflow-hidden">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Nền tảng Quản lý Đồ án</h2>
                    <p className="text-sm text-gray-500 mt-1">Kéo và thả các thẻ để thay đổi trạng thái công việc.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
                >
                    <Plus size={18} /> Thêm công việc
                </button>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-4 gap-6 h-full pb-4 items-start w-full">
                    {COLUMN_ORDER.map(colId => (
                        <Droppable key={colId} droppableId={colId}>
                            {(provided, snapshot) => (
                                <div 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`w-full flex flex-col max-h-full rounded-2xl p-3 transition-colors duration-200 ${
                                        snapshot.isDraggingOver ? 'bg-gray-100' : 'bg-gray-50/80'
                                    }`}
                                >
                                    <div className="flex items-center justify-between mb-4 px-1 mt-1">
                                        <div className="flex items-center gap-2.5">
                                            <span className={`w-2 h-2 rounded-full shadow-sm ${COLUMN_CONFIG[colId].color}`}></span>
                                            <h3 className="font-semibold text-xs text-gray-600 uppercase tracking-wider">
                                                {COLUMN_CONFIG[colId].title}
                                            </h3>
                                            <span className="bg-gray-200/60 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">
                                                {tasks[colId].length}
                                            </span>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-800 hover:bg-gray-200 p-1.5 rounded-md transition-colors">
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-2 scrollbar-hide min-h-[150px]">
                                        {tasks[colId].map((task, index) => (
                                            <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                                                {(provided, snapshot) => (
                                                    <TaskCard 
                                                        task={task} 
                                                        provided={provided} 
                                                        snapshot={snapshot}
                                                        onClick={() => setSelectedTask(task)}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>

            <CreateTaskModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                onTaskCreated={fetchTasks}
            />

            <TaskDetailModal 
                isOpen={!!selectedTask}
                task={selectedTask} 
                onClose={() => setSelectedTask(null)} 
                onTaskUpdated={fetchTasks}
            />
        </div>
    );
}
