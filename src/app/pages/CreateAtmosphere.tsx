import React, { useState } from 'react';
import { api } from '../../api/client';

export default function CreateAtmosphere() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('cozy');

  const submit = async () => {
    const payload = { title, description, category, visibility: 'public' };
    await api.post('/atmospheres', payload);
    alert('Created');
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Create Atmosphere</h2>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 mb-2" />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" className="w-full p-2 mb-2" />
      <input value={category} onChange={e=>setCategory(e.target.value)} placeholder="Category" className="w-full p-2 mb-2" />
      <button onClick={submit} className="px-4 py-2 bg-green-400 rounded">Create</button>
    </div>
  );
}
