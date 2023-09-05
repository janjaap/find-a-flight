import Head from 'next/head';

import styles from '@/styles/Home.module.css';
import { Header } from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { useFlights } from '@/providers/FlightsProvider';
import { Flights } from '@/components/Flights/Flights';

export default function Home() {
  const { flights, criteria } = useFlights();

  return (
    <>
      <Head>
        <title>Schiphol - Find My Flight</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="https://cdn.schiphol.nl/static/favicon.svg" />
      </Head>

      <main className={styles.main}>
        <Header />

        <Hero />

        <div className={styles['content-container']}>
          <div className={styles.content}>{flights && <Flights flights={flights} criteria={criteria} />}</div>
        </div>
      </main>
    </>
  );
}
