import { trackVisitPageTimeInfo } from '@/config/pageTrackInfo';

const PAGE_VISIT_TIME_INFO = 'PAGE_VISIT_TIME_INFO';

function setSessionVisitInfo(value) {
  if (!value) {
    return;
  }
  if (typeof value !== 'object') {
    return;
  }
  sessionStorage.setItem(PAGE_VISIT_TIME_INFO, JSON.stringify(value));
}

function getSessionVisitInfo() {
  const infoStr = sessionStorage.getItem(PAGE_VISIT_TIME_INFO);

  try {
    const info = JSON.parse(infoStr);
    return info || {};
  } catch (error) {
    console.log(error);
  }
  return {};
}

function trackVisitInfo() {
  const info = getSessionVisitInfo();
  Object.keys(info).forEach((key) => {
    const itemVisit = info[key];
    if (
      itemVisit.enterTime &&
      itemVisit.leaveTime &&
      itemVisit.leaveTime - itemVisit.enterTime > 0
    ) {
      console.log(itemVisit.leaveTime - itemVisit.enterTime, '时长', key);
      trackVisitPageTimeInfo({
        pagePath: key,
        timeInfo: itemVisit,
      });
      info[key] = {};
    }
  });
  setSessionVisitInfo(info);
}

export function dealWithVisit({ fromPath, toPath }) {
  const visiInfo = getSessionVisitInfo();

  if (visiInfo[toPath]) {
    visiInfo[toPath].enterTime = Date.now();
  } else {
    visiInfo[toPath] = {
      enterTime: Date.now(),
    };
  }

  if (fromPath === '/') {
    // 刷新页面
    setSessionVisitInfo(visiInfo);
    return;
  }

  if (visiInfo[fromPath]) {
    visiInfo[fromPath].leaveTime = Date.now();
  } else {
    visiInfo[fromPath] = {
      leaveTime: Date.now(),
    };
  }

  setSessionVisitInfo(visiInfo);
  trackVisitInfo();
}
