'use client';

import { useEffect, useState } from 'react';

export default function Toast({ toasts, removeToast }) {
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.type}`}
          role="alert"
          onClick={() => removeToast(t.id)}
          style={{ cursor: 'pointer' }}
        >
          <span className="toast-icon">
            {t.type === 'success' ? '✓' : '✕'}
          </span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
