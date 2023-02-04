import {forwardRef} from 'react';
import {StyleSheet} from 'react-native';
import SearchField, {SearchFieldProps} from 'components/inputs/_/fields/search';
import {InputHandle} from './base';
import {useTheme} from 'hooks';

const HeaderSearch = forwardRef<InputHandle, SearchFieldProps>(
  function HeaderSearch(props, ref) {
    const theme = useTheme();
    const _style = createStyle(theme);

    return (
      <SearchField
        ref={ref}
        style={_style.searchInput}
        prefix={{
          style: _style.searchInputPrefixButton,
        }}
        postfix={{
          style: _style.searchInputPostfixButton,
        }}
        {...props}
      />
    );
  },
);

function createStyle(theme: Judiye.Theme) {
  const {colors, spacing, sizing} = theme;
  const height = sizing.height.nm - sizing.border.width * 2 - 2;

  return StyleSheet.create({
    clearIcon: {
      marginLeft: spacing.nm,
    },
    searchInput: {
      backgroundColor: colors.surface.secondary,
      borderRadius: 1000,
      borderWidth: 0,
      height: sizing.height.nm,
    },
    searchInputPrefixButton: {
      borderTopLeftRadius: sizing.height.sm / 2,
      borderBottomLeftRadius: sizing.height.sm / 2,
      height,
      paddingLeft: spacing.sm - sizing.border.width,
      paddingRight: spacing.sm - sizing.border.width,
    },
    searchInputPostfixButton: {
      height,
      width: height,
    },
  });
}

export default HeaderSearch;
