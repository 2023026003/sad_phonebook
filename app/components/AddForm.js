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

export default function AddForm({ onAdd }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(name, phone);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    const ok = await onAdd(name.trim(), phone.trim());
    setLoading(false);

    if (ok) {
      setName('');
      setPhone('');
      setErrors({});
    }
  }

  return (
    <div className="card">
      <p className="card-title">새 연락처 추가</p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <div className="field">
            <label htmlFor="add-name">이름</label>
            <input
              id="add-name"
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
              className={errors.name ? 'error' : ''}
              placeholder="홍길동"
              autoComplete="name"
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="add-phone">전화번호</label>
            <input
              id="add-phone"
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: '' })); }}
              className={errors.phone ? 'error' : ''}
              placeholder="010-1234-5678"
              autoComplete="tel"
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-full"
          id="add-contact-btn"
          disabled={loading}
        >
          {loading ? '추가 중…' : '+ 연락처 추가'}
        </button>
      </form>
    </div>
  );
}
