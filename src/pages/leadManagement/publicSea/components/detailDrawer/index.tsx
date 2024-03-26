import { Card, Drawer, Space, Table, Tag, Row } from 'poizon-design';
import _ from 'lodash';
import ProDescriptions from '@poizon-design/pro-descriptions';
import ProTable from '@poizon-design/pro-table';
import { useRef } from 'react';
import { getPublicSeaRealMsg } from '../../service';
import styles from './index.module.less';

export default ({
  detailVisible,
  formState,
  batchLeadId,
  setDetailVisible,
  setFormState,
  refreshList,
  invokeUpdateDetail,
}) => {
//   const columns = useColumns();
//   const basicsColumns = useBasicsColumns({ data: formState.customerSeaResponse });
//   const enterpriseEnterColumns = useEnterpriseEnterColumns();
  const ref = useRef<{
    refresh: () => void;
  }>();

  const view = async (type: string, index: number) => {
    const res: any = await getPublicSeaRealMsg({ id: batchLeadId, fields: [type] });
    const tempState = _.cloneDeep(formState);
    if (!tempState?.leadsContactInfoResponseList) return;
    switch (type) {
      case 'MOBILE':
        tempState.leadsContactInfoResponseList[index].contactMobileNumber = _.get(
          res,
          'contactMobileNumber',
          null,
        );
        break;
      case 'TELEPHONE':
        tempState.leadsContactInfoResponseList[index].contactTelephone = _.get(
          res,
          'contactTelephone',
          null,
        );
        break;
      case 'WECHAT':
        tempState.leadsContactInfoResponseList[index].contactWechat = _.get(
          res,
          'contactWechat',
          null,
        );
        break;
      case 'WEIBO':
        tempState.leadsContactInfoResponseList[index].contactWeibo = _.get(
          res,
          'contactWeibo',
          null,
        );
        break;
      case 'EMAIL':
        tempState.leadsContactInfoResponseList[index].contactEmail = _.get(
          res,
          'contactEmail',
          null,
        );
        break;
      default:
        break;
    }
    setFormState(tempState);
  };
//   const enterpriseColumns = useEnterpriseColumns({ view });

  const onRefresh = () => {
    invokeUpdateDetail(batchLeadId);
    ref.current?.refresh?.();
  };

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
                    {formState?.customerSeaResponse?.priorityName && (
                      <Tag style={{ fontWeight: 400 }}>
                        {formState?.customerSeaResponse?.priorityName}
                      </Tag>
                    )}
                  </Space>
                }
                column={3}
                dataSource={formState?.customerSeaResponse}
                // columns={basicsColumns}
              />
            </Card>

            {formState.outSidePlatformInfos ? (
              <Card className={styles.box}>
                <h3>外网销售概况</h3>
                <div>
                  <Table
                    dataSource={formState.outSidePlatformInfos}
                    // columns={columns}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                  />
                </div>
              </Card>
            ) : null}
            {formState.leadsContactInfoResponseList ? (
              <Card className={styles.box}>
                <h3>联系人信息</h3>
                <ProTable
                  dataSource={formState?.leadsContactInfoResponseList || []}
                //   columns={enterpriseColumns}
                  options={false}
                  search={false}
                  scroll={{ x: 'max-content' }}
                  pagination={false}
                ></ProTable>
              </Card>
            ) : null}

            {formState.enterpriseEnterInfoResponse ? (
              <Card className={styles.box}>
                <ProDescriptions
                  title="入驻信息"
                  column={3}
                  dataSource={formState?.enterpriseEnterInfoResponse}
                //   columns={enterpriseEnterColumns}
                />
              </Card>
            ) : null}
          </Space>
          {/* <Card>
            <FollowUpLog leadsId={batchLeadId} ref={ref} fromPage={FromPage.公海} />
          </Card> */}
        </Row>
        {/* <div className={styles.footer}>
          <Operate
            invokeUpdateDetail={onRefresh}
            record={{
              ...formState?.leadsDetailOperateResponse,
              ...formState?.customerSeaResponse,
              leadsId: batchLeadId,
            }}
            buttonType="primary"
          ></Operate>
        </div> */}
      </Drawer>
    </>
  );
};
