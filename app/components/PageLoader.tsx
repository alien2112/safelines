"use client";

import { useEffect } from 'react';

export function PageLoader() {
  useEffect(() => {
    // Add page-loaded class immediately since we removed the loading screen
    if (typeof window !== 'undefined') {
      document.body.classList.add('page-loaded');
    }
  }, []);

  return null;
}





















