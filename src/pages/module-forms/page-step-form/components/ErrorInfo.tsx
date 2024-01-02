import { FC } from 'react';
import styles from '../index.less';

interface ErrorInfoProps {
  errorList: { label: unknown; value: unknown }[];
}
/**
 * 用户表单输入的错误信息展示
 */
export const ErrorInfo: FC<ErrorInfoProps> = (props) => {
  return (
    <div className={`${styles.box} ${styles.borderRed}`}>
      <div className={styles.box_title}>错误信息</div>
      {props.errorList.map((item, index) => (
        <div className={styles.list} key={index}>
          <span className={styles.list_label}>
            {index + 1}.{item.label}
          </span>
          <span>{item.value}</span>
        </div>
      ))}
    </div>
  );
};
