import {Text} from 'components/typography';
import {useTheme} from 'hooks';
import {ReactNode} from 'react';

interface Props {
  children: ReactNode;
}

export default function ScreenTitle(props: Props) {
  const {spacing} = useTheme();
  return (
    <>
      <Text align="center" size="title" style={{marginTop: spacing.xlg}}>
        Judiye
      </Text>
      <Text
        align="center"
        size="subtitle"
        style={{marginTop: spacing.md, marginBottom: spacing.lg}}
        {...props}
      />
    </>
  );
}
