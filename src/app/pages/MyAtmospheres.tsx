import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function MyAtmospheres() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{ api.get('/atmospheres').then(res=>{
    // filter by createdBy if user id available
    setItems(res || []);
  }).catch(()=>{}); }, []);
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-4">My Atmospheres</h2>
      <div className="space-y-3">
        {items.map(i=> <div key={i._id} className="p-3 border rounded">{i.title}</div>)}
      </div>
    </div>
  );
}
