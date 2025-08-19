// src/app/(tabs)/feed.tsx
import React, { useEffect } from 'react';
import FeedScreen from '@features/feed/screens/FeedScreen';

export default function FeedRoute() {
  useEffect(() => {
    console.log('[Route] (tabs)/feed mounted');
  }, []);
  return <FeedScreen />;
}
