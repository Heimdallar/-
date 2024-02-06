/* 全局配置项 */
import duTrack from '@du/track';

const trackInfoList = [
  {
    nodeId: 'crm_publicSea',
    nodeName: '公海',
    nodeType: 'PAGE',
    description: '公海',
    pageUrl: '/leadManagement/publicSea',
  },
  {
    nodeId: 'crm_privateSea',
    nodeName: '私海',
    nodeType: 'PAGE',
    description: '私海',
    pageUrl: '/leadManagement/privateSea',
  },
  {
    nodeId: 'crm_categoryConfig',
    nodeName: '类目运营配置',
    nodeType: 'PAGE',
    description: '类目运营配置',
    pageUrl: '/leadManagement/categoryConfig',
  },
  {
    nodeId: 'crm_addressBook',
    nodeName: '通讯录',
    nodeType: 'PAGE',
    description: '通讯录',
    pageUrl: '/leadManagement/addressBook',
  },
  {
    nodeId: 'crm_newBrandApprovalConfig',
    nodeName: '新增品牌审核配置',
    nodeType: 'PAGE',
    description: '新增品牌审核配置',
    pageUrl: '/leadManagement/newBrandApprovalConfig',
  },
  {
    nodeId: 'crm_style',
    nodeName: '类目风格配置',
    nodeType: 'PAGE',
    description: '类目风格配置',
    pageUrl: '/leadManagement/style',
  },
  {
    nodeId: 'crm_labelManagement',
    nodeName: '标签管理',
    nodeType: 'PAGE',
    description: '标签管理',
    pageUrl: '/leadManagement/labelManagement',
  },
  {
    nodeId: 'crm_requirements',
    nodeName: '需求清单',
    nodeType: 'PAGE',
    description: '需求清单',
    pageUrl: '/target/requirements',
  },
  {
    nodeId: 'crm_opportunityManagement',
    nodeName: '招商品牌库',
    nodeType: 'PAGE',
    description: '招商品牌库',
    pageUrl: '/settleIn/opportunityManagement',
  },
  {
    nodeId: 'crm_settleIn/investmentAttraction/view',
    nodeName: '活动详情',
    nodeType: 'PAGE',
    description: '活动详情',
    pageUrl: '/settleIn/investmentAttraction/view',
  },
  {
    nodeId: 'crm_settleIn/investmentAttraction/edit',
    nodeName: '编辑活动',
    nodeType: 'PAGE',
    description: '编辑活动',
    pageUrl: '/settleIn/investmentAttraction/edit',
  },
  {
    nodeId: 'crm_settleIn/investmentAttraction/create',
    nodeName: '新建活动',
    nodeType: 'PAGE',
    description: '新建活动',
    pageUrl: '/settleIn/investmentAttraction/create',
  },
  {
    nodeId: 'crm_investmentAttraction',
    nodeName: '招商邀约入驻',
    nodeType: 'PAGE',
    description: '招商邀约入驻',
    pageUrl: '/settleIn/investmentAttraction',
  },
  {
    nodeId: 'crm_settleIn/applyManagement',
    nodeName: '申请单管理',
    nodeType: 'PAGE',
    description: '申请单管理',
    pageUrl: '/settleIn/applyManagement',
  },
  {
    nodeId: 'crm_settleIn/applyReview',
    nodeName: '申请单评审',
    nodeType: 'PAGE',
    description: '申请单评审',
    pageUrl: '/settleIn/applyReview',
  },
  {
    nodeId: 'crm_settleIn/applyManagement/edit',
    nodeName: '编辑申请单',
    nodeType: 'PAGE',
    description: '编辑申请单',
    pageUrl: '/settleIn/applyManagement/edit',
  },
  {
    nodeId: 'crm_taskCenter/export',
    nodeName: '任务中心',
    nodeType: 'PAGE',
    description: '任务中心',
    pageUrl: '/taskCenter/export',
  },
  {
    nodeId: 'crm_settleIn/channelManagement',
    nodeName: '渠道管理',
    nodeType: 'PAGE',
    description: '渠道管理',
    pageUrl: '/settleIn/channelManagement',
  },
];

export const pageTrackMap = () => {
  const pageMap: any = {};
  trackInfoList.forEach((item) => {
    pageMap[item.pageUrl] = {
      nodeId: item.nodeId,
      nodeName: item.nodeName,
      nodeType: item.nodeType,
    };
  });
  return pageMap;
};

export const trackPage = (pagePath: string) => {
  const pageMap: any = pageTrackMap();
  if (!pageMap[pagePath]) {
    return;
  }
  try {
    const params = pageMap[pagePath];
    duTrack.sendExpose(params);
  } catch (error) {
    console.log('trackPage error', error);
  }
};

export const trackVisitPageTimeInfo = ({ pagePath, timeInfo }) => {
  const pageMap: any = pageTrackMap();
  if (!pageMap[pagePath]) {
    return;
  }
  try {
    const params = pageMap[pagePath];
    duTrack.sendExpose({
      ...params,
      eventType: 'duration',
      ...timeInfo,
    });
  } catch (error) {
    console.log(error);
  }
};
