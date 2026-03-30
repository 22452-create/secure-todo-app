import { LockKeyhole, Mail } from 'lucide-react';
import React, { useState } from 'react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(); // Mock login for now
    }
  };

  return (
    <div className="glass-panel animate-slide-up" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
      <div style={{ marginBottom: '32px' }}>
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', display: 'inline-flex', padding: '16px', borderRadius: '50%', marginBottom: '16px' }}>
          <LockKeyhole size={32} color="var(--primary)" />
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>Secure Todo Access</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '8px' }}>
          プロジェクトの環境永続化テスト用
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Mail size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="keio.jp または Gmail"
            className="input-premium"
            style={{ paddingLeft: '44px' }}
            required
          />
        </div>
        
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          Google で認証する
        </button>
      </form>

      <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        ※現在はモックモードでのログインです。Firebaseの設定完了後に本物の認証へ切り替わります。
      </div>
    </div>
  );
}
