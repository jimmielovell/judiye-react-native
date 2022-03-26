import {useMemo} from 'react';
import * as svgs from 'assets/svgs';
import wrapper from 'hoc/wrapper';

import {IconProps} from '../types';

const Icon = wrapper(({name, ...rest}: IconProps) => {
  // @ts-ignore
  const SVGIcon = useMemo(() => svgs[name], [name]);
  return <SVGIcon {...rest} />;
});

export default Icon;
