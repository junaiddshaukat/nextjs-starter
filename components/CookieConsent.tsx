'use client';
import { useEffect, useState } from 'react';

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem('ga_consent')) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('ga_consent', 'true');
    setShow(false);
    window.location.reload(); // reload to trigger analytics
  };
  const decline = () => {
    localStorage.setItem('ga_consent', 'false');
    setShow(false);
  };

  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      <span className="mb-2 md:mb-0">This site uses cookies for analytics. See our privacy policy for more info.</span>
      <div className="flex gap-2">
        <button className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700" onClick={accept}>Accept</button>
        <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600" onClick={decline}>Decline</button>
      </div>
    </div>
  );
} 