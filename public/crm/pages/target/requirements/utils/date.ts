// 要禁用的时分秒集合
export const range = (start: number, end: number) => {
  const disabledArr: number[] = [];
  for (let i = start; i < end; i++) {
    disabledArr.push(i)
  }
  return disabledArr;
};

// 开始、结束时间(时分秒)禁用（结束时间>开始时间，开始时间<结束时间）

const isSameDay = (dateA: Date, dateB: Date) => {
  const timeA = `${ dateA.getFullYear()}-${dateA.getMonth() + 1}-${dateA.getDate()}`;
  const timeB = `${ dateB.getFullYear()}-${dateB.getMonth() + 1}-${dateB.getDate()}`;
  return timeA === timeB;
}

export const diasbleDateAfterNow = (time: any) => {
  if (!time) return;
  const timeDate = time.toDate();
  const currentTime = new Date();

  if (!isSameDay(timeDate, currentTime)) {
    return +timeDate > +currentTime;
  }
  return false;
}
export const diasbleTimeAfterNow = (time: any) => {
  if (!time) return;
  const timeDate = time.toDate();
  const currentTime = new Date();

  // 不是相同的天
  if (!isSameDay(timeDate, currentTime)) {
    // 昨天，都不限制
    if (timeDate < currentTime) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      }
    }
    // 明天，全部限制
    return {
      disabledHours: () => range(0, 24),
      disabledMinutes: () => range(0, 60),
      disabledSeconds: () => range(0, 60),
    }
  }

  if (timeDate.getHours() < currentTime.getHours()) {
    return {
      disabledHours: () => range(currentTime.getHours() + 1, 24),
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    }
  }

  if (timeDate.getHours() > currentTime.getHours()) {
    return {
      disabledHours: () => range(currentTime.getHours() + 1, 24),
      disabledMinutes: () => range(0, 60),
      disabledSeconds: () => range(0, 60),
    }
  }

  // 小时一样
  if (timeDate.getMinutes() < currentTime.getMinutes()) {
    return {
      disabledHours: () => range(currentTime.getHours() + 1, 24),
      disabledMinutes: () => range(currentTime.getMinutes() + 1, 60),
      disabledSeconds: () => [],
    }
  }

  if (timeDate.getMinutes() > currentTime.getMinutes()) {
    return {
      disabledHours: () => range(currentTime.getHours() + 1, 24),
      disabledMinutes: () => range(currentTime.getMinutes() + 1, 60),
      disabledSeconds: () => range(0, 60),
    }
  }
  // 分钟一样

  return {
    disabledHours: () => range(currentTime.getHours() + 1, 24),
    disabledMinutes: () => range(currentTime.getMinutes() + 1, 60),
    disabledSeconds: () => range(currentTime.getSeconds() + 1, 60),
  }
};
