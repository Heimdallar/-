import { Drawer, Space, Table, Tag, Affix } from 'poizon-design';
import ProDescriptions from '@poizon-design/pro-descriptions';
import _ from 'lodash';
import ProTable from '@poizon-design/pro-table';
import { useRef } from 'react';
import { useColumns, initFormState } from '../../config';
import { DetailDrawer } from '../../interface';
import './index.less';
import { FromPage } from '../../contant';
import FollowUpLog from '../followUpLog';
import ProgressFeedbackModal from '../progressFeedbackModal';
import useBasicsColumns from './useBasicsColumns';
import useEnterpriseColumns from './useEnterpriseColumns';
import useEnterpriseEnterColumns from './useEnterpriseEnterColumns';

const detailDrawer: React.FC<DetailDrawer> = ({
  detailVisible,
  formState,
  batchLeadId,
  setDetailVisible,
  setFormState,
  invokeUpdateDetail,
}) => {
  const detail = formState?.customerSeaResponse || {};
  const { operates = [] } = formState?.leadsDetailOperateResponse || {};
  const columns = useColumns();
  const basicsColumns = useBasicsColumns({ data: detail });
  const enterpriseEnterColumns = useEnterpriseEnterColumns();

  const enterpriseColumns = useEnterpriseColumns();
  const logsRef = useRef<{ refresh: () => void }>();

  if (detail?.status <= 0 || !detailVisible) return null;

  return (
    <div>
      <Drawer
        visible={detailVisible}
        title="线索详情"
        width={1300}
        maskClosable
        onClose={() => {
          setDetailVisible(false);
          setFormState({ ...initFormState });
        }}
        closable
      >
        <div className="df">
          <Space direction="vertical" size="middle" className="body f1">
            <div className="box">
              <ProDescriptions
                title={
                  <Space>
                    <span>基础信息</span>
                    {formState?.customerSeaResponse?.priorityName && (
                      <Tag style={{ fontWeight: 400 }}>
                        {formState?.customerSeaResponse?.priorityName}
                      </Tag>
                    )}
                  </Space>
                }
                column={3}
                dataSource={formState?.customerSeaResponse}
                columns={basicsColumns}
              />
            </div>

            {formState.outSidePlatformInfos ? (
              <div className="box">
                <h3>外网销售概况</h3>
                <div>
                  <Table
                    dataSource={formState.outSidePlatformInfos}
                    columns={columns}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    rowKey={(record: any) => record.shopChannel + Math.random()}
                  />
                </div>
              </div>
            ) : null}

            <div className="box">
              <h3>联系人信息</h3>
              <ProTable
                dataSource={formState?.leadsContactInfoResponseList || []}
                columns={enterpriseColumns}
                options={false}
                search={false}
                scroll={{ x: 'max-content' }}
                pagination={false}
              ></ProTable>
            </div>

            {formState.enterpriseEnterInfoResponse ? (
              <div className="box">
                <ProDescriptions
                  title="入驻信息"
                  column={3}
                  dataSource={formState?.enterpriseEnterInfoResponse}
                  columns={enterpriseEnterColumns}
                />
              </div>
            ) : null}
          </Space>
          <div className="footer">
              {operates.includes('反馈跟进进度') && (
                <Affix offsetBottom={10}>
                  <ProgressFeedbackModal
                    leadsContactInfoResponseList={formState?.leadsContactInfoResponseList || []}
                    status={detail?.status}
                    leadsId={detail?.leadsId}
                    reload={() => {
                      invokeUpdateDetail(batchLeadId);
                      logsRef.current?.refresh();
                    }}
                  />
                </Affix>
              )}
          </div>
          <FollowUpLog leadsId={batchLeadId} ref={logsRef} fromPage={FromPage.私海} />
        </div>
      </Drawer>
    </div>
  );
};
export default detailDrawer;
