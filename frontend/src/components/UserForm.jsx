import React, { useState, useEffect } from 'react';

const EMPTY = { name: '', email: '', password: '' };

export default function UserForm({ onSubmit, editingUser, onCancel }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setForm({ name: editingUser.name, email: editingUser.email, password: '' });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [editingUser]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'El nombre es requerido';
    if (!form.email.trim()) errs.email = 'El email es requerido';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido';
    if (!editingUser && !form.password) errs.password = 'La contraseña es requerida';
    else if (!editingUser && form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    onSubmit(form);
    setForm(EMPTY);
  };

  return (
    <form className="user-form" onSubmit={handleSubmit}>
      <h3>{editingUser ? 'Editar usuario' : 'Crear usuario'}</h3>

      <div className="form-group">
        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? 'input-error' : ''}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          name="password"
          type="password"
          placeholder={editingUser ? 'Nueva contraseña (opcional)' : 'Contraseña'}
          value={form.password}
          onChange={handleChange}
          className={errors.password ? 'input-error' : ''}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-success">
          {editingUser ? 'Actualizar' : 'Crear'}
        </button>
        {editingUser && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
