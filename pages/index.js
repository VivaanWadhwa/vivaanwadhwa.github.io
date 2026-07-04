import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Game from '../components/game/Game';

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  // The game is keyboard-only: mobile/touch-first visitors go straight to
  // the text resume instead.
  useEffect(() => {
    const isMobile =
      window.innerWidth < 768 ||
      window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) {
      router.replace('/resume');
    } else {
      setReady(true);
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Vivaan Wadhwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {ready && <Game />}
    </>
  );
}
