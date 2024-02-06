import { makeAutoObservable, runInAction } from 'mobx';

// 模拟异步
function sleep(ms: number) {
  // eslint-disable-next-line no-promise-executor-return
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 全局state，可以在多个组件中订阅
// 把对象变成observable
const counterStore: any = makeAutoObservable({
  value: 1,
  poseVal: 0,
  get doubleValue() {
    // computed value
    return counterStore.value * 2;
  },
  increment() {
    counterStore.value += 1;
  },
  decrement() {
    counterStore.value -= 1;
  },
  // async方法处理
  async asynIncrement() {
    await sleep(1000);
    runInAction(() => {
      counterStore.value += 1;
    });
  },
});

export default counterStore;