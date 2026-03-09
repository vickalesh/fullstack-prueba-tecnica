import React, { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../services/api';
import UserForm from './UserForm';
import UserList from './UserList';

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch {
      showMessage('Error al cargar usuarios', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSubmit = async (formData) => {
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
        showMessage('Usuario actualizado correctamente');
        setEditingUser(null);
      } else {
        await createUser(formData);
        showMessage('Usuario creado correctamente');
      }
      fetchUsers();
    } catch (err) {
      const msg = err.response?.data?.message || 'Error al guardar usuario';
      showMessage(msg, 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await deleteUser(id);
      showMessage('Usuario eliminado');
      fetchUsers();
    } catch {
      showMessage('Error al eliminar usuario', 'error');
    }
  };

  return (
    <section className="section">
      <h2>👥 Gestión de Usuarios</h2>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <UserForm
        onSubmit={handleSubmit}
        editingUser={editingUser}
        onCancel={() => setEditingUser(null)}
      />

      <UserList
        users={users}
        onEdit={setEditingUser}
        onDelete={handleDelete}
        loading={loading}
      />
    </section>
  );
}
