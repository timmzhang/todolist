import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash2, GripVertical } from 'lucide-react';
import type { Todo } from './TodoList';

interface Props {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 bg-white border rounded-lg ${
        isDragging ? 'shadow-lg' : 'shadow-sm'
      } ${todo.completed ? 'bg-gray-50' : ''}`}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none text-gray-400 hover:text-gray-600"
      >
        <GripVertical size={20} />
      </button>

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
      />

      <span
        className={`flex-1 text-gray-700 ${
          todo.completed ? 'line-through text-gray-400' : ''
        }`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}