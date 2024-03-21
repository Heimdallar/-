import React from 'react';
import { isEmpty } from 'lodash';
import { ProFieldRequestData } from '@/utils/types';
import { ProSelectProps } from '../../index';
import { getUserList } from '../../api';
import BusinessBasicSelect from '../BussinessBasicSelect';

type UserSelect = {
  dynamicLoad?: boolean;
  isShowOutwardCallRobot?: boolean;
} & ProSelectProps;
const outwardCallRobotObj = {
  label: '智能外呼机器人',
  value: 900000000,
};

const UserSelect: React.FC<UserSelect> = (props) => {
  const { className, value, onChange, isShowOutwardCallRobot = false, ...restProps } = props;
  const dynamicFetchUserList: ProFieldRequestData<string | number> = async (userName) => {
    const userListByNameRes: any = await getUserList({ userName });
    if (isEmpty(userListByNameRes) || !userListByNameRes?.username) {
      return isShowOutwardCallRobot ? [outwardCallRobotObj] : [];
    }
    return isShowOutwardCallRobot
      ? [
          {
            label: userListByNameRes.username,
            value: userListByNameRes.id,
          },
          outwardCallRobotObj,
        ]
      : [
          {
            label: userListByNameRes.username,
            value: userListByNameRes.id,
          },
        ];
  };

  return (
    <>
      <BusinessBasicSelect
        showSearch
        allowClear
        value={value}
        onChange={onChange}
        // className={`${Style.CategorySelect} ${className}`}
        optionFilterProp="label"
        dynamicLoadRequest={dynamicFetchUserList}
        {...restProps}
      />
    </>
  );
};

export default UserSelect;
