'use client';
import { useCallback, useState } from 'react';
import Loader from '@/components/Loader'; import Hero from '@/components/Hero';
export default function Home() { const [loading, setLoading] = useState(true); const done = useCallback(() => setLoading(false), []); return <>{loading && <Loader onDone={done} />}<main><Hero /></main></>; }
