import type { PropsWithChildren } from 'react';

import styles from './Label.module.css';

interface Props {
  id: string;
  isVisuallyHidden?: boolean;
}

export function Label({ id, children, isVisuallyHidden }: PropsWithChildren<Props>) {
  const classNames = [styles.label, isVisuallyHidden && 'visually-hidden'].filter(Boolean).join(' ');

  return (
    <label htmlFor={id} className={classNames}>
      {children}
    </label>
  );
}
