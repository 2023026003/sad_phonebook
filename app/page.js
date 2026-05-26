'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AddForm from './components/AddForm';
import ContactItem from './components/ContactItem';
import EditModal from './components/EditModal';
import DeleteModal from './components/DeleteModal';
import Toast from './components/Toast';

/* ── Toast helper ── */
let toastId = 0;

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState([]);

  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  /* ── Toast ── */
  const addToast = useCallback((message, type = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  /* ── Fetch contacts ── */
  const fetchContacts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      addToast('연락처를 불러오지 못했습니다.', 'error');
    } else {
      setContacts(data);
    }
    setLoading(false);
  }, [addToast]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  /* ── Create ── */
  async function handleAdd(name, phone) {
    const { error } = await supabase.from('contacts').insert({ name, phone });
    if (error) {
      addToast('연락처 추가에 실패했습니다.', 'error');
      return false;
    }
    addToast('연락처가 추가되었습니다.');
    await fetchContacts();
    return true;
  }

  /* ── Update ── */
  async function handleSave(id, name, phone) {
    const { error } = await supabase
      .from('contacts')
      .update({ name, phone, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      addToast('연락처 수정에 실패했습니다.', 'error');
    } else {
      addToast('연락처가 수정되었습니다.');
      setEditTarget(null);
      await fetchContacts();
    }
  }

  /* ── Delete ── */
  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', deleteTarget.id);

    if (error) {
      addToast('연락처 삭제에 실패했습니다.', 'error');
    } else {
      addToast('연락처가 삭제되었습니다.');
      setDeleteTarget(null);
      await fetchContacts();
    }
    setDeleteLoading(false);
  }

  return (
    <main className="wrapper">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-icon" aria-hidden="true">📞</div>
          <h1>전화번호 관리</h1>
          <p>연락처를 간편하게 등록·수정·삭제하세요</p>
        </header>

        {/* Add Form */}
        <AddForm onAdd={handleAdd} />

        {/* Contact List */}
        <div className="card">
          <div className="stats-bar">
            <p className="card-title" style={{ margin: 0 }}>연락처 목록</p>
            {!loading && (
              <p className="stats-count">
                총 <span>{contacts.length}</span>개
              </p>
            )}
          </div>

          {loading ? (
            <div className="contact-list">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton" />
              ))}
            </div>
          ) : contacts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <p>등록된 연락처가 없습니다.</p>
              <p style={{ marginTop: 6, fontSize: '0.82rem', opacity: 0.6 }}>
                위 폼에서 첫 번째 연락처를 추가해 보세요.
              </p>
            </div>
          ) : (
            <div className="contact-list" role="list">
              {contacts.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  onEdit={setEditTarget}
                  onDelete={setDeleteTarget}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {editTarget && (
        <EditModal
          contact={editTarget}
          onClose={() => setEditTarget(null)}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          contact={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDeleteConfirm}
          loading={deleteLoading}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </main>
  );
}
