import React, { useMemo } from 'react';
import { ProColumns } from '@poizon-design/pro-table';
import { Button, message, Space } from 'poizon-design';

const useColumns = (
  setRow: () => void,
  SetOpportunityShow: React.Dispatch<React.SetStateAction<boolean>>,
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const columns = useMemo(() => {
    function copyToClipboard(text) {
      const input = document.createElement('input');
      input.setAttribute('value', text);
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }

    const handleCopy = async (recordNo) => {
      copyToClipboard(recordNo);
      message.success('复制成功');
    };
    return [
      {
        title: '渠道缩写',
        dataIndex: 'channelCode',
        key: 'channelCode',
        // hideInTable: true,
        width: 180,
        fieldProps: {
          placeholder: '请输入',
          maxLength: 10,
        },
      },
      {
        title: '渠道名称',
        dataIndex: 'channelName',
        key: 'channelName',
        // hideInTable: true,
        width: 180,
        fieldProps: {
          placeholder: '请输入',
          maxLength: 50,
        },
      },
      {
        title: '更新人',
        dataIndex: 'creatorName',
        key: 'modifyTime',
        hideInSearch: true,
        width: 180,
      },
      {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        hideInSearch: true,
        width: 220,
      },
      {
        title: '操作',
        dataIndex: '',
        hideInSearch: true,
        width: 180,
        render(_, record) {
          console.log(record, 'record');

          return (
            <Space>
              {record.level === 3 && (
                <>
                  <Button
                    type="link"
                    disabled={!record.canEdit}
                    onClick={() => {
                      const { mainCategory, mainCategoryId, ...rest } = record;
                      setRow(record);
                      SetOpportunityShow(true);
                      setIsEdit(true);
                      setIsAdd(true);
                    }}
                  >
                    编辑
                  </Button>
                </>
              )}

              {record.level === 2 && (
                <>
                  <Button
                    type="link"
                    disabled={!record.canAddSub}
                    onClick={() => {
                      const { mainCategory, mainCategoryId, ...rest } = record;
                      setRow(record);
                      SetOpportunityShow(true);
                      setIsEdit(false);
                      setIsAdd(true);
                    }}
                  >
                    添加子类
                  </Button>
                </>
              )}

              {record.level === 3 && (
                <Button type="link" onClick={() => handleCopy(record.channelDesc)}>
                  复制渠道标识
                </Button>
              )}
            </Space>
          );
        },
      },
    ];
  }, []);
  return columns;
};

export { useColumns };
