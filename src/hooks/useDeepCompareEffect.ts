// Adapted from https://github.com/kentcdodds/use-deep-compare-effect

import {useEffect, useMemo, useRef} from 'react';

type UseEffectParams = Parameters<typeof useEffect>;
type EffectCallback = UseEffectParams[0];
type DependencyList = UseEffectParams[1];
type UseEffectReturn = ReturnType<typeof useEffect>;

const has = Object.prototype.hasOwnProperty;

export function deepEqual(foo: any, bar: any): boolean {
  let ctor, len;
  if (foo === bar) {
    return true;
  }

  if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
    if (ctor === Date) {
      return foo.getTime() === bar.getTime();
    }
    if (ctor === RegExp) {
      return foo.toString() === bar.toString();
    }

    if (ctor === Array) {
      if ((len = foo.length) === bar.length) {
        while (len-- && deepEqual(foo[len], bar[len])) {}
      }
      return len === -1;
    }

    if (!ctor || typeof foo === 'object') {
      len = 0;
      for (ctor in foo) {
        if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) {
          return false;
        }
        if (!(ctor in bar) || !deepEqual(foo[ctor], bar[ctor])) {
          return false;
        }
      }
      return Object.keys(bar).length === len;
    }
  }

  // eslint-disable-next-line no-self-compare
  return foo !== foo && bar !== bar;
}

function checkDeps(deps: DependencyList) {
  if (!deps || !deps.length) {
    throw new Error(
      'useDeepCompareEffect should not be used with no dependencies. Use React.useEffect instead.',
    );
  }
  if (deps.every(isPrimitive)) {
    throw new Error(
      'useDeepCompareEffect should not be used with dependencies that are all primitive values. Use React.useEffect instead.',
    );
  }
}

function isPrimitive(val: unknown) {
  return val == null || /^[sbn]/.test(typeof val);
}

/**
 * @param value the value to be memoized (usually a dependency list)
 * @returns a memoized version of the value as long as it remains deeply equal
 */
export function useDeepCompareMemoize<T>(value: T) {
  const ref = useRef<T>(value);
  const signalRef = useRef<number>(0);

  if (!deepEqual(value, ref.current)) {
    ref.current = value;
    signalRef.current += 1;
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => ref.current, [signalRef.current]);
}

function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn {
  if (process.env.NODE_ENV !== 'production') {
    checkDeps(dependencies);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
}

export function useDeepCompareEffectNoCheck(
  callback: EffectCallback,
  dependencies: DependencyList,
): UseEffectReturn {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useEffect(callback, useDeepCompareMemoize(dependencies));
}

export default useDeepCompareEffect;
