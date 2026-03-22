import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function Explore() {
  const [items, setItems] = useState<any[]>([]);
  const [q, setQ] = useState('');

  useEffect(() => { fetchList(); }, []);

  const fetchList = async () => {
    const res = await api.get(`/atmospheres?q=${encodeURIComponent(q)}`);
    setItems(res || []);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl mb-4">Explore Atmospheres</h2>
      <div className="mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by title or tag" className="w-full p-2 rounded" />
        <button onClick={fetchList} className="mt-2 px-4 py-2 bg-blue-400 rounded">Search</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(it => (
          <div key={it._id} className="rounded-lg overflow-hidden shadow p-4 bg-white">
            <div className="h-36 bg-gray-100 mb-3" style={{backgroundImage: `url(${it.coverImageUrl || ''})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm text-gray-600">{it.category} • {it.moodTags?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
