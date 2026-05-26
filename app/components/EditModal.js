'use client';

import { useState } from 'react';

const PHONE_REGEX = /^[0-9-]+$/;

function validate(name, phone) {
  const errors = {};
  if (!name.trim()) errors.name = '이름을 입력해 주세요.';
  if (!phone.trim()) errors.phone = '전화번호를 입력해 주세요.';
  else if (!PHONE_REGEX.test(phone.trim()))
    errors.phone = '숫자와 하이픈(-)만 입력 가능합니다. 예) 010-1234-5678';
  return errors;
}

export default function EditModal({ contact, onClose, onSave }) {
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    const errs = validate(name, phone);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    await onSave(contact.id, name.trim(), phone.trim());
    setLoading(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') onClose();
  }

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="edit-modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="edit-modal-title">✏️ 연락처 수정</h2>
          <button className="modal-close" onClick={onClose} aria-label="닫기">✕</button>
        </div>

        <div className="form">
          <div className="field">
            <label htmlFor="edit-name">이름</label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
              onKeyDown={handleKeyDown}
              className={errors.name ? 'error' : ''}
              placeholder="이름 입력"
              autoFocus
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="edit-phone">전화번호</label>
            <input
              id="edit-phone"
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: '' })); }}
              onKeyDown={handleKeyDown}
              className={errors.phone ? 'error' : ''}
              placeholder="010-0000-0000"
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose} disabled={loading}>취소</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={loading} id="edit-save-btn">
            {loading ? '저장 중…' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
