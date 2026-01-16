'use client';

import { useState } from 'react';
import { MovieSidebar } from '@/components/MovieSidebar';
import { MovieList } from '@/components/MoveList/MovieList';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('cinema');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <MovieSidebar
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <MovieList category={activeCategory} />
    </div>
  );
}
