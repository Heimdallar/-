import { Card, Drawer, Space, Table, Tag, Row } from 'poizon-design';
import _ from 'lodash';
import ProDescriptions from '@poizon-design/pro-descriptions';
import ProTable from '@poizon-design/pro-table';
import { useRef } from 'react';
import { getPublicSeaRealMsg } from '../../service';
import styles from './index.module.less';
import Operate from '../operate';
import { columns, contactcolumns, entercolumns, outcolumns } from './columns';

export default ({
  detailVisible,
  formState,
  batchLeadId,
  setDetailVisible,
  setFormState,
  refreshList,
  invokeUpdateDetail,
}) => {

  const ref = useRef<{
    refresh: () => void;
  }>();
  
  return (
    <>
      <Drawer
        visible={detailVisible}
        title="线索详情"
        width={1300}
        maskClosable
        onClose={() => {
          setDetailVisible(false);
          setFormState({});
        }}
        closable
        destroyOnClose
        bodyStyle={{ backgroundColor: '#f8f8fa' }}
        afterVisibleChange={(value) => !value && refreshList()}
      >
        <Row wrap={false} style={{ paddingBottom: 64 }}>
          <Space
            direction="vertical"
            size="middle"
            className={styles.body}
            style={{ marginRight: 10 }}
          >
            <Card className={styles.box}>
              <ProDescriptions
                title={
                  <Space>
                    <span>基础信息</span>
                    {formState?.leadsId && (
                      <Tag style={{ fontWeight: 400 }}>
                        {formState?.leadsId}
                      </Tag>
                    )}
                  </Space>
                }
                column={3}
                dataSource={formState}
                columns={columns}
              />
            </Card>

             
              <Card className={styles.box}>
                <h3>外网销售概况</h3>
                <div>
                  <Table
                    dataSource={formState?.outdata}
                    columns={outcolumns}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                  />
                </div>
              </Card>
      
          
              <Card className={styles.box}>
                <h3>联系人信息</h3>
                <ProTable
                  dataSource={formState?.contactdata || []}
                  columns={contactcolumns}
                  options={false}
                  search={false}
                  scroll={{ x: 'max-content' }}
                  pagination={false}
                ></ProTable>
              </Card>
      

        
              <Card className={styles.box}>
                <ProDescriptions
                  title="入驻信息"
                  column={3}
                  dataSource={formState}
                  columns={entercolumns}
                />
              </Card>
          
          </Space>
         
        </Row>
        
      </Drawer>
    </>
  );
};
