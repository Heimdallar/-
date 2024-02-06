import buildMakeServiceProviderList from './queryServiceProviderList';
import buildMakeCategoryList from './queryCategoryList';
import buildMakeListCategory from './queryListCategory';
import buildMakePermissionDataPage from './queryUserPermissionDataList';

export const makeServiceProviderList = buildMakeServiceProviderList();
export const makeCategoryList = buildMakeCategoryList();
export const makeServiceProviderListCategory = buildMakeListCategory();
export const makePermissionDataPage = buildMakePermissionDataPage();
