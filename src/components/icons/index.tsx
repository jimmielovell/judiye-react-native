import * as svgs from 'assets/svgs';
import wrapper from 'hoc/wrapper';
import {IconProps} from './types';

const Icon = wrapper(({name, ...rest}: IconProps) => {
  // @ts-ignore
  const SVGIcon = svgs[name];
  return <SVGIcon {...rest} />;
});

export {Icon};
