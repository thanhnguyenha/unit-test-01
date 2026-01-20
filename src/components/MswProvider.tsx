'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { initMocks } from '@/mocks';

const isMockEnabled = process.env.NEXT_PUBLIC_MOCK_ENABLE === 'true';

export function MswProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [ready, setReady] = useState(!isMockEnabled);

  useEffect(() => {
    if (!isMockEnabled) return;
    initMocks().then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div style={{ padding: 20, textAlign: 'center', color: '#666' }}>
        Đang tải mock...
      </div>
    );
  }

  return <>{children}</>;
}
