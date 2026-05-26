'use client';

export default function ContactItem({ contact, onEdit, onDelete }) {
  const initial = contact.name.charAt(0).toUpperCase();

  return (
    <div className="contact-item" role="listitem">
      <div className="contact-avatar" aria-hidden="true">
        {initial}
      </div>

      <div className="contact-info">
        <p className="contact-name">{contact.name}</p>
        <p className="contact-phone">{contact.phone}</p>
      </div>

      <div className="contact-actions">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => onEdit(contact)}
          id={`edit-btn-${contact.id}`}
          aria-label={`${contact.name} 수정`}
        >
          ✏️ 수정
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(contact)}
          id={`delete-btn-${contact.id}`}
          aria-label={`${contact.name} 삭제`}
        >
          🗑️ 삭제
        </button>
      </div>
    </div>
  );
}
