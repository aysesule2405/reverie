import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function EditAtmosphere({ id }: { id: string }) {
  const [item, setItem] = useState<any | null>(null);
  useEffect(()=>{ if (id) api.get(`/atmospheres/${id}`).then(res=>setItem(res)).catch(()=>{}); }, [id]);
  const save = async () => { if (!item) return; await api.put(`/atmospheres/${id}`, item); alert('Saved'); };
  if (!item) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl mb-4">Edit Atmosphere</h2>
      <input value={item.title} onChange={e=>setItem({...item, title: e.target.value})} className="w-full p-2 mb-2" />
      <textarea value={item.description} onChange={e=>setItem({...item, description: e.target.value})} className="w-full p-2 mb-2" />
      <button onClick={save} className="px-4 py-2 bg-yellow-400 rounded">Save</button>
    </div>
  );
}
