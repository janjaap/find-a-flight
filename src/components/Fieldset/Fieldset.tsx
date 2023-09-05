import type { PropsWithChildren } from 'react';

import styles from './Fieldset.module.css';

interface Props {
  direction?: 'vertical' | 'horizontal';
}

export function Fieldset({ children, direction = 'horizontal' }: PropsWithChildren<Props>) {
  const classNames = [styles.fieldset, direction === 'vertical' && styles['fieldset--vertical']]
    .filter(Boolean)
    .join(' ');

  return <fieldset className={classNames}>{children}</fieldset>;
};
