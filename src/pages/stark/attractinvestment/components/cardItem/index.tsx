import React, { useState, useEffect, useRef, FC } from 'react';
import { Button, Tooltip } from 'poizon-design';
import RegisterDialog from '../registerDialog/index';
import { statusColor } from '../../contants';
import styles from './index.module.less';

interface Iprops {
  index: number;
  meetings: Array<{
    catesStr: string;
    explain: string;
  }>;
}
interface Item {
  time: string;
  encodedId: string;
  meetingAddress: string;
  explain: string;
  catesStr: string;
  name: string;
  meetingStatusStr: string;
}
const CardItem: FC<Iprops> = (props) => {
  const { index, meetings } = props;
  const divRef = useRef(null);
  const [expandStatus, setExpandStatus] = useState<boolean[]>(meetings.map(() => true));
  const [isHovered, setIsHovered] = useState(meetings.map(() => false));
  const checkOverflow = (text) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (context) {
      const computedStyle = window.getComputedStyle(document.body);
      const fontSize = parseFloat(computedStyle.fontSize);
      const fontFamily = computedStyle.fontFamily;
  
      context.font = `${fontSize}px ${fontFamily}`;
      const textWidth = context.measureText(text).width;
  
      return textWidth >= 765;
    }
    return false;
  };
  const checkExplainOverflow = (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return false;

    return element.scrollHeight > element.clientHeight;
  };
  const explainElementId = `explain_${index}`;

  useEffect(() => {
    const overflow = checkExplainOverflow(explainElementId);

    // 根据实际情况设置是否溢出
    console.log(overflow);
  }, [explainElementId]);
  const handleMouseEnter = (i) => {
    const newIsHovered = [...isHovered];
    newIsHovered[i] = true;
    setIsHovered(newIsHovered);
  };
  const handleMouseLeave = (i) => {
    const newIsHovered = [...isHovered];
    newIsHovered[i] = false;
    setIsHovered(newIsHovered);
  };
  return (
    <div className={styles.card}>
      {meetings.map((item: Item, index: number) => {
        const isOverflow = checkOverflow(item.catesStr);
        const explainIsOverflow = item.explain?.length > 100;
        return (
          <div
            className={styles.cardBox}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            <div className={styles.cardItem}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <span className={styles.title}>{item.name}</span>
                <span className={`${styles[statusColor?.[item.meetingStatusStr]]}`}>
                  {item.meetingStatusStr}
                </span>
              </div>
              {explainIsOverflow ? (
                <Tooltip
                  title={<div className={styles.customTooltip}>{item.explain}</div>}
                  color="#ffffff"
                  placement="bottomRight"
                  overlayInnerStyle={{ padding: '12px 16px' }}
                >
                  <div className={styles.intro} id={explainElementId}>
                    {item.explain}
                  </div>
                </Tooltip>
              ) : (
                <div className={styles.intro}>{item.explain}</div>
              )}
              <div className={styles.category}>
                <span className={styles.icons}>
                  <img
                    src="https://h5static.dewucdn.com/node-common/d71fea82-a9d5-1091-91c6-4aac9c1a6c42-64-64.png"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>
                <span>招商类目：</span>
                {expandStatus[index] ? (
                  <span className={styles.categoryText} ref={divRef}>
                    {item.catesStr}
                  </span>
                ) : (
                  <span style={{ width: 700 }}>{item.catesStr}</span>
                )}

                <span>
                  {expandStatus[index] && isOverflow && (
                    <Button
                      type="link"
                      onClick={() => {
                        const newExpandStatus = [...expandStatus];
                        newExpandStatus[index] = false;
                        setExpandStatus(newExpandStatus);
                      }}
                    >
                      <div>
                        展开
                        <img
                          src="https://cdn.poizon.com/node-common/912b0b84-c85e-d7dc-97eb-5d4bb8d89bd2-32-32.png"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </div>
                    </Button>
                  )}
                  {!expandStatus[index] && (
                    <Button
                      type="link"
                      onClick={() => {
                        const newExpandStatus = [...expandStatus];
                        newExpandStatus[index] = true;
                        setExpandStatus(newExpandStatus);
                      }}
                    >
                      <div>
                        收起
                        <img
                          src="https://cdn.poizon.com/node-common/c7099b5e-4209-a474-721e-26ebf117fee9-32-32.png"
                          alt=""
                          width={16}
                          height={16}
                        />
                      </div>
                    </Button>
                  )}
                </span>
              </div>
              <div className={styles.holdingTime}>
                <span className={styles.icons}>
                  <img
                    src="https://h5static.dewucdn.com/node-common/5319c95e-98ee-99d5-4921-91de8a62c19c-64-64.png"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span>举办时间：{item.time}</span>
              </div>
              <div className={styles.address}>
                <span className={styles.icons}>
                  <img
                    src="https://h5static.dewucdn.com/node-common/6b1c0be2-98bc-b106-9771-74a436e2c094-64-64.png"
                    alt=""
                    width={16}
                    height={16}
                  />
                </span>

                <span>举办地址：{item.meetingAddress}</span>
              </div>
            </div>
            <div
              className={
                item.meetingStatusStr !== '已结束' ? styles.cardItemRight : styles.cardItemRightEd
              }
            >
              {item.meetingStatusStr !== '已结束' && (
                <RegisterDialog encodedId={item.encodedId} isHovered={isHovered[index]} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardItem;
