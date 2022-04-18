import {ReactNode, RefObject} from 'react';
import {FViewProps} from 'components/layout/types';

export interface MenuProps {
  children: ReactNode;
}

export interface TabPanelHandle {
  __setActive: () => void;
  __setInactive: () => void;
}
export interface TabPanelsHandle {
  __setActiveTab: (index: number) => void;
}

export interface TabPanelsProps {
  children?: ReactNode;
  ref: RefObject<TabPanelHandle>;
}

export interface TabsProps extends FViewProps {
  withRef: RefObject<TabPanelsHandle>;
}

export interface TabHandle {
  setActive: () => void;
  setInactive: () => void;
}
