import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function Favorites() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{ api.get('/favorites').then(res=>setItems(res || [])).catch(()=>{}); }, []);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">Favorites</h2>
      <ul>
        {items.map(f => (
          <li key={f._id} className="mb-3 border-b pb-3">{f.atmosphereId?.title || 'Unknown'}</li>
        ))}
      </ul>
    </div>
  );
}
