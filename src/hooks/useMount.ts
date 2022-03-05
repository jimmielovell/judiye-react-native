import {useEffect} from 'react';

export default function useMount(func: () => void) {
  return useEffect(() => func());
}
