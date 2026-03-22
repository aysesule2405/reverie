import React, { useEffect, useState } from 'react';
import { api } from '../../api/client';

export default function Detail({ id }: { id: string }) {
  const [item, setItem] = useState<any | null>(null);

  useEffect(() => { if (id) api.get(`/atmospheres/${id}`).then(res => setItem(res)).catch(()=>{}); }, [id]);

  if (!item) return <div className="p-6">Loading...</div>;
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl mb-2">{item.title}</h2>
      <p className="text-sm text-gray-600 mb-4">By {item.createdBy?.name || 'Unknown'}</p>
      <div className="h-64 bg-gray-100 mb-4" style={{backgroundImage: `url(${item.coverImageUrl || ''})`, backgroundSize: 'cover'}} />
      <p className="mb-4">{item.description}</p>
      <div className="space-y-2">
        {item.songLinks?.map((s:string, i:number)=> (
          <a key={i} href={s} target="_blank" rel="noreferrer" className="text-blue-500 block">Listen: {s}</a>
        ))}
      </div>
    </div>
  );
}
