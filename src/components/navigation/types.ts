import {ReactNode, RefObject} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {ButtonProps} from 'components/buttons/types';
import {FViewProps} from 'components/layout/types';

export interface MenuProps {
  children: ReactNode;
}

export interface TabPanelHandle {
  __setActiveTab: (i: number) => void;
}

export interface TabPanelsProps {
  children?: ReactNode;
  ref: RefObject<TabPanelHandle>;
}

export interface TabsProps extends FViewProps {
  withRef: RefObject<TabPanelHandle>;
}

export type TabProps = ButtonProps & {
  active?: boolean;
  activeStyle?: StyleProp<ViewStyle>;
  width?: number;
};

export interface TabHandle {
  setActive: () => void;
  setInactive: () => void;
}
