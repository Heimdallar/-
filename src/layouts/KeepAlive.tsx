import ReactDOM from 'react-dom';
import {
  JSXElementConstructor,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from 'react';
import { useOutlet } from '@umijs/max';

type Children = ReactElement<any, string | JSXElementConstructor<any>> | null;

interface ComponentProps {
  active: boolean;
  children: Children;
  name: string;
  renderDiv: RefObject<HTMLDivElement>;
}

/**
 * 实现组件的动态挂载
 * @param props
 * @returns
 */
export function Component(props: ComponentProps) {
  const { active, children, name, renderDiv } = props;
  const [targetElement] = useState(() => document.createElement('div'));
  const activatedRef = useRef(false);
  activatedRef.current = activatedRef.current || active;
  useEffect(() => {
    if (active) {
      renderDiv.current?.appendChild(targetElement);
    } else {
      renderDiv.current?.removeChild(targetElement);
    }
  }, [active, name, renderDiv, targetElement]);

  useEffect(() => {
    targetElement.setAttribute('id', name);
  }, [name, targetElement]);
  return <>{activatedRef.current && ReactDOM.createPortal(children, targetElement)}</>;
}

/**
 * 检测当前页面Key是否需要被缓存
 * @param key
 * @param include
 * @param exclude
 * @returns boolean
 */
function shouldKeep(key: string, include: ConditionScope, exclude: ConditionScope = []): boolean {
  // exclude
  if (typeof exclude === 'function') {
    if (exclude(key)) {
      return false;
    }
  } else if (Array.isArray(key)) {
    if (exclude.includes(key)) {
      return false;
    }
  }

  // include
  if (typeof include === 'function') {
    return include(key);
    // eslint-disable-next-line
  } else if (Array.isArray(key)) {
    return include.includes(key);
  }

  return true;
}

export type ConditionScope = string[] | ((key: string) => boolean);

interface Props {
  active?: string;
  include?: ConditionScope;
  exclude?: ConditionScope;
  maxLen?: number;
  children: Children;
}

interface KeepAliveItem {
  name: string;
  ele?: Children;
}

export const notFound = -1;

/**
 * 缓存组件
 * @param props
 * @returns
 */

export function KeepAlive(props: Props) {
  const { active = '', exclude = [], include = [], maxLen = 10 } = props;
  const ele = useOutlet();
  const containerRef = useRef<HTMLDivElement>(null);
  const [components, setComponents] = useState<KeepAliveItem[]>([]);

  useLayoutEffect(() => {
    // 超过上限基于LRU Cache清理
    // if (components.length > maxLen && maxLen > 0) {
    //   setComponents(components.slice(components.length - maxLen));
    // }

    const idx = components.findIndex((res) => res.name === active);
    if (idx === notFound) {
      if (shouldKeep(active, include, exclude)) {
        setComponents([
          ...components,
          {
            ele,
            name: active,
          },
        ] as KeepAliveItem[]);
      }
    } else if (idx < components.length - 1) {
      // LRU Cache latest should put at the stack end
      setComponents([...components.slice(0, idx), ...components.slice(idx + 1), components[idx]]);
    }
  }, [ele, active, maxLen, include, exclude, components]);

  // active 为空时返回默认组件
  if (!active) {
    return ele;
  }

  if (maxLen <= 0) {
    throw new Error('KeepAlive maxlen should > 0');
  }

  return (
    <>
      <div ref={containerRef} className="keep-alive" />
      {!shouldKeep(active, include, exclude) && ele}
      {components.map((p) => (
        <Component active={p.name === active} renderDiv={containerRef} name={p.name} key={p.name}>
          {p.ele as Children}
        </Component>
      ))}
    </>
  );
}
