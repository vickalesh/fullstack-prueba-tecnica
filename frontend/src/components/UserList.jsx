import React from 'react';

export default function UserList({ users, onEdit, onDelete, loading }) {
  if (loading) return <p className="loading">Cargando usuarios...</p>;
  if (users.length === 0) return <p className="empty">No hay usuarios registrados.</p>;

  return (
    <table className="user-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
            <td>
              <button className="btn btn-warning btn-sm" onClick={() => onEdit(user)}>
                Editar
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => onDelete(user.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
