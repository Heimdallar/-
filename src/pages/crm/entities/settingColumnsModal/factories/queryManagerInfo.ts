import type { Data } from '../interface/queryManagerInfo';

const buildMakeConfigQueryBaseConfig = () => {
  return function makeConfigQueryBaseConfig(record: Data) {
    if (!record?.id) {
      return [];
    }

    return [
      {
        id: record.id,
        realname: record.realname,
        nickname: record.nickname,
        username: record.username,
        sex: record.sex,
        value: record.id,
        label: record.username,
      },
    ];
  };
};

export default buildMakeConfigQueryBaseConfig;
