import { Checkbox, Col, message, Modal, Row, Space, Spin, Typography } from 'poizon-design';
import { useEffect, useState } from 'react';
import { Container, Draggable } from '@business/react-smooth-dnd';
import { ClearOutlined, CloseOutlined, HolderOutlined, SettingOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'poizon-design/lib/checkbox';
import { cloneDeep } from 'lodash';
// import fetchConfigQueryBaseConfigService from '@/services/settingColumnsModal/queryBaseConfig';
// import fetchConfigSaveUserConfigService from '@/services/settingColumnsModal/saveUserConfig';
// import fetchConfigQueryUserConfigService from '@/services/settingColumnsModal/queryUserConfig';
// import { AllColumn } from '@/entities/settingColumnsModal/interface/queryBaseConfig';
// import {
//   SelectedColumn,
//   SelectedColumnsType,
// } from '@/entities/settingColumnsModal/interface/queryUserConfig';
// import styles from './index.module.less';

const { Title, Text } = Typography;

interface InProps {
  tableKey: string;
  onOk?: (columns) => void;
}
interface DragResult {
  removedIndex: number;
  addedIndex: number;
  payload: any
}

function SettingColumns({ tableKey, onOk }: InProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const onClose = () => {
    setVisible(false);
    setAllColumns([]);
    setSelectedColumns([]);
  };
  // 全部columns配置项
  const [allColumns, setAllColumns] = useState<[]>([]);
  // columns配置项
  const [selectedColumns, setSelectedColumns] = useState<[]>([]);
  const [buttonLoading, setButtonLoading] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  const fetchCustomTableQueryBaseConfig = async () => {
    setLoading(true);
    const res = await fetchConfigQueryBaseConfigService({ tableKey });
    setLoading(false);
    if (!res.success) return;
    setAllColumns(res.data.allColumns || []);
    setSelectedColumns(res.data?.selectedColumns || []);
  };
  useEffect(() => {
    if (!visible) return;
    fetchCustomTableQueryBaseConfig();
  }, [visible]);

  const onDrag = (arr: SelectedColumn[], dragResult: DragResult) => {
    const { removedIndex, addedIndex } = dragResult;
    if (removedIndex === null && addedIndex === null) {
      return arr;
    }
    const result = cloneDeep(arr);
    if (!selectedColumns[addedIndex].movable) return false;
    result[addedIndex] = result.splice(removedIndex, 1, result[addedIndex])[0];
    return result;
  };

  // 拖拽事件
  const onDrop = (dropResult: DragResult) => {
    const { removedIndex, addedIndex } = dropResult;
    if (removedIndex !== null || addedIndex !== null) {
      const list = onDrag([...selectedColumns], dropResult);
      if (!list) return;
      setSelectedColumns(list);
    }
  };

  const onChangeColumnCheckbox = (e: CheckboxChangeEvent, record: SelectedColumn) => {
    setAllColumns(
      allColumns.map((item: AllColumn) => {
        return {
          ...item,
          selected: item.columnKey === record.columnKey ? e.target.checked : item.selected,
        };
      }),
    );
    if (e.target.checked) {
      return setSelectedColumns([...selectedColumns, record]);
    }
    setSelectedColumns(
      selectedColumns.filter((item: SelectedColumn) => item.columnKey !== record.columnKey),
    );
  };

  // 移除
  const deleteSelectedColumns = (record: SelectedColumn) => {
    setSelectedColumns(
      selectedColumns.filter((item: SelectedColumn) => item.columnKey !== record.columnKey),
    );
    setAllColumns(
      allColumns.map((item: AllColumn) => {
        return {
          ...item,
          selected: item.columnKey === record.columnKey ? false : item.selected,
        };
      }),
    );
  };

  // 提交配置
  const onSubmit = async () => {
    setButtonLoading(true);
    const res = await fetchConfigSaveUserConfigService({
      tableKey,
      selectedColumns: selectedColumns.map((item: SelectedColumn) => ({
        columnKey: item.columnKey,
      })),
    });
    setButtonLoading(false);
    if (!res.success) return;
    message.success('设置成功');
    const resConfig = await fetchConfigQueryUserConfigService({ tableKey });
    if (!resConfig.success) return;
    onOk?.(resConfig.data.selectedColumns);
    onClose();
  };

  // 清空 移除固定项意外的columns
  const allClear = () => {
    setSelectedColumns(selectedColumns.filter((item) => item.required));
    setAllColumns(
      allColumns.map((item: AllColumn) => {
        return {
          ...item,
          selected: item.required ? item.selected : false,
        };
      }),
    );
  };

  return (
    <>
      <SettingOutlined onClick={() => setVisible(true)} />
      <Modal
        className={styles.container}
        width={800}
        title={'请选择并排序要展示的字段'}
        visible={visible}
        onCancel={onClose}
        onOk={onSubmit}
        destroyOnClose={true}
        centered
        okButtonProps={{
          loading: buttonLoading,
        }}
      >
        <Spin spinning={loading}>
          <Row>
            <Col span={12}>
              <Title level={5}>全部</Title>
              <div className={styles.columnsBox}>
                {allColumns.map((item: AllColumn) => {
                  return (
                    <div className={styles.listItem} key={item.columnKey}>
                      <Checkbox
                        onChange={(e: CheckboxChangeEvent) => onChangeColumnCheckbox(e, item)}
                        disabled={item.required}
                        checked={item.selected}
                      >
                        {item.columnName}
                      </Checkbox>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.flex}>
                <Title level={5}>
                  已展示 <span className={styles.desc_test}>共 {selectedColumns.length} 项</span>
                </Title>
                <span
                  className={styles.desc_test}
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={allClear}
                >
                  <ClearOutlined color="red" /> 清空
                </span>
              </div>
              <div className={styles.columnsBox} style={{ marginLeft: 5 }}>
                <Container
                  onDrop={onDrop}
                  dragClass={styles.dragClass}
                  shouldAcceptDrop={(_, payload) => {
                    return !!payload.movable;
                  }}
                  getChildPayload={(index) => {
                    return selectedColumns[index];
                  }}
                >
                  {selectedColumns.map((item: SelectedColumn) => {
                    return (
                      <Draggable key={item.columnKey}>
                        <Row className={styles.listItem} justify="space-between" align="middle">
                          <Space>
                            {item.movable ? (
                              <HolderOutlined />
                            ) : (
                              <span className={styles.seize_a_seat}></span>
                            )}
                            <Text>{item.columnName}</Text>
                          </Space>
                          {!item.required && (
                            <CloseOutlined onClick={() => deleteSelectedColumns(item)} />
                          )}
                        </Row>
                      </Draggable>
                    );
                  })}
                </Container>
              </div>
            </Col>
          </Row>
        </Spin>
      </Modal>
    </>
  );
}

export default SettingColumns;
