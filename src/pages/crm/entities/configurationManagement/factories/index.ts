import buildMakeOrgSelectOrgDataRole from './querySelectOrgDataRole';
import buildMakeOrgSelectOrgInfo from './querySelectOrgInfo';
import buildMakeOrgSelectOrgUser from './querySelectOrgUser';
import buildMakeOrgSelectOrgTree from './queryOrgSelectOrgTree';
import buildMakeCategoryList from './queryCategoryList';

export const makeOrgSelectOrgTree = buildMakeOrgSelectOrgTree();
export const makeOrgSelectOrgUser = buildMakeOrgSelectOrgUser();
export const makeOrgSelectOrgInfo = buildMakeOrgSelectOrgInfo();
export const makeOrgSelectOrgDataRole = buildMakeOrgSelectOrgDataRole();
export const makeCategoryList = buildMakeCategoryList();
