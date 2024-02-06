const buildMakeCategoryList = () => {
  return function makeMakeCategoryList(record) {
    if (!record) {
      return null;
    }

    return {
      label: record.name,
      value: record.id,
    };
  };
};

export default buildMakeCategoryList;
