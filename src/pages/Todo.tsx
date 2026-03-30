import React, { useState } from 'react';
import { LogOut, Plus, Check, Trash2 } from 'lucide-react';

interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export default function Todo({ onLogout }: { onLogout: () => void }) {
  const [todos, setTodos] = useState<TodoItem[]>([
    { id: 1, text: 'Google Drive連携のテスト', completed: true },
    { id: 2, text: '逐次思考ワークフローのテスト', completed: true },
    { id: 3, text: 'Firebase CI/CDの構築', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([{ id: Date.now(), text: newTodo, completed: false }, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="animate-slide-up" style={{ width: '100%', maxWidth: '600px', padding: '20px' }}>
      
      {/* Header */}
      <header className="glass-panel" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0 }}>Secure Todo</h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--success)' }}>● Authenticated</span>
        </div>
        <button onClick={onLogout} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LogOut size={18} />
          <span>Exit</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="glass-panel" style={{ padding: '32px' }}>
        <form onSubmit={addTodo} style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          <input
            type="text"
            className="input-premium"
            placeholder="新しいタスクを追加..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ padding: '14px' }}>
            <Plus size={20} />
          </button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {todos.map(todo => (
            <li 
              key={todo.id} 
              style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px',
                padding: '16px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--surface-border)',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                opacity: todo.completed ? 0.6 : 1
              }}
            >
              <button 
                onClick={() => toggleTodo(todo.id)}
                style={{
                  width: '24px', height: '24px',
                  borderRadius: '50%',
                  border: `2px solid ${todo.completed ? 'var(--success)' : 'var(--surface-border)'}`,
                  background: todo.completed ? 'var(--success)' : 'transparent',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white'
                }}
              >
                {todo.completed && <Check size={14} />}
              </button>
              
              <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? 'var(--text-muted)' : 'inherit' }}>
                {todo.text}
              </span>

              <button 
                onClick={() => deleteTodo(todo.id)}
                style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', opacity: 0.7 }}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
