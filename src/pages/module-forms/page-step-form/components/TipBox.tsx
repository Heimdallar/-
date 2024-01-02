import { FC } from 'react';
import styles from '../index.less';

/**
 * 用户表单输入字段的提示信息
 * @returns
 */
export const TipBox: FC<{ activeKey: string }> = (props) => {
  let content = {
    title: '',
    fields: [],
    demo: [],
  };
  switch (props.activeKey) {
    case 'manageType': {
      content = {
        title: '企业经营类型',
        fields: [
          '服务商只能做某些类目的刻字服务（如手表-腕表-腕表定制刻字），正常无特殊情况请选择销售商',
        ],
        demo: [],
      };
      break;
    }
    case 'businessType': {
      content = {
        title: '商家类型',
        fields: [
          '请根据实际情况选择对应的商家类型:',
          '1.有企业营业执照，从事于生产、购销、运输以及服务性活动的经营实体，请选择企业类型；',
          '2.自然人从事工商业经营，经依法登记，请选择个体工商户；',
          '3.由一个自然人投资，财产为投资人个人所有，投资人以其个人财产对企业债务承担无限责任的经营实体，请选择个体独资企业',
        ],
        demo: ['https://cdn.poizon.com/node-common/bdfdfd2a8197a9e8363de8cb9ab49f51.png'],
      };
      break;
    }
    default: {
      // content = { title: '', fields: [], demo: [] };
    }
  }
  return (
    <div className={`${styles.box} ${styles.borderBlue}`}>
      <div className={styles.box_title}>{content.title || ''}</div>

      <div className={styles.box_subTitle}>字段说明</div>
      <div className={styles.box_description}>
        {content.fields.map((d, i) => (
          <p key={i} className="my-2">
            {d}
          </p>
        ))}
      </div>
      {!!content.demo.length && (
        <>
          <div className={styles.box_subTitle}>示例</div>
          <div className={styles.box_img}>
            {content.demo.map((d, i) => (
              <img key={i} src={d} className="w-full" />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
