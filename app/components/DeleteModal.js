'use client';

export default function DeleteModal({ contact, onClose, onConfirm, loading }) {
  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="modal confirm-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
      >
        <div className="confirm-body">
          <div className="confirm-icon">🗑️</div>
          <h3 id="delete-modal-title">연락처를 삭제하시겠습니까?</h3>
          <p>
            <strong>{contact.name}</strong> ({contact.phone}) 을(를)
            <br />
            삭제하면 되돌릴 수 없습니다.
          </p>
        </div>

        <div className="modal-actions" style={{ marginTop: '28px' }}>
          <button className="btn btn-ghost" onClick={onClose} disabled={loading}>
            취소
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={loading}
            id="delete-confirm-btn"
          >
            {loading ? '삭제 중…' : '삭제'}
          </button>
        </div>
      </div>
    </div>
  );
}
