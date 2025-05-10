'use client';

import { useEffect } from 'react';

export function GoogleAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem('ga_consent') !== 'true') return;
    if ((window as any).gtag) return;
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    if (!GA_ID) return;
    // Inject GA script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script1);
    const script2 = document.createElement('script');
    script2.innerHTML = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_ID}');`;
    document.head.appendChild(script2);
  }, []);
  return null;
} 