import { createContainer as _createContainer } from '@umijs/max';

interface ContainerProviderProps<State = void> {
  initialState?: State;
  children: React.ReactNode;
}

interface Container<Value, State = void> {
  Provider: React.ComponentType<ContainerProviderProps<State>>;
  useContainer: () => Value;
}

class SingleGlobalStore {
  private static container: Container<any, any>;
  public static createContainer<Value, State = void>(
    useHook: (initialState?: State) => Value,
  ): Container<Value, State> {
    if (this.container == null) {
      this.container = _createContainer(useHook);
    }
    return this.container;
  }

  public static useContainer() {
    if (this.container !== null) {
      return this.container.useContainer();
    }
    return null;
  }
}

export const createGlobalContainer = SingleGlobalStore.createContainer.bind(SingleGlobalStore);
export const useGlobalContainer = SingleGlobalStore.useContainer.bind(SingleGlobalStore);
