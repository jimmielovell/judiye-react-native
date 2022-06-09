import {useMemo} from 'react';
import * as svgs from 'assets/svgs';

import {IconProps} from '../types';

const Icon = function Icon({name, ...rest}: IconProps) {
  // @ts-ignore
  const SVGIcon = useMemo(() => svgs[name], [name]);
  return <SVGIcon {...rest} />;
};

export default Icon;
