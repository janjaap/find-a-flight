import { FindAFlight } from '../FindAFlight/FindAFlight';
import styles from './Hero.module.css';

export const Hero = () => (
  <section className={styles.hero}>
    <div className={styles['hero-inner']}>
      <div className={styles['hero-body']}>
        <h1>
          <span className={styles['hero-title']}>Amsterdam Airport</span>
          <span className={styles['hero-title-sub']}>Reis je via Schiphol?</span>
        </h1>

        <FindAFlight />
      </div>
    </div>
  </section>
);
