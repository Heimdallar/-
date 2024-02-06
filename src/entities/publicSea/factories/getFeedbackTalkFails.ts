interface IRecord {
  id: number;
  label: string;
  next: IRecord[];
}

const makeTreeList = (list: IRecord[]) => {
  const treeList = list.map((item) => {
    const { id, label, next } = item;
    return {
      value: id,
      label,
      children: next ? makeTreeList(next) : null,
    };
  });
  return treeList;
};

const buildMakePrivateSeaGetFeedbackTalkFails = () => {
  return function makePrivateSeaGetFeedbackTalkFails(record: IRecord[]) {
    if (!record) {
      return [];
    }
    const list = makeTreeList(record);
    return list;
  };
};

export default buildMakePrivateSeaGetFeedbackTalkFails;
