import type { InputHTMLAttributes } from 'react';

import styles from './Input.module.css';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'style'> {
  erroneousInput?: boolean;
}

export const Input = ({ erroneousInput, type, ...restProps }: Props) => <input type={type} {...restProps} className={`${styles.input} ${erroneousInput ? styles['input--error'] : ''}`} />;
