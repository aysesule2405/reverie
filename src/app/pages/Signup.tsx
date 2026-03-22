import React, { useState } from 'react';
import { useAuth } from '../AuthContext';

export default function Signup() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try { await register(name, email, password); alert('Registered'); } catch (e:any) { alert(e.message || 'Error'); }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Sign up</h2>
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full p-2 mb-2" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 mb-2" />
      <button onClick={submit} className="px-4 py-2 bg-green-400 rounded">Create account</button>
    </div>
  );
}
