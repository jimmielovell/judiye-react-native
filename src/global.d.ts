import '@react-navigation/native';

interface Font {
  size: number;
  weight:
    | 'bold'
    | 'normal'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  family: string;
}

declare global {
  namespace Watfoe {
    namespace Theme {
      interface Colors {
        black: string;
        white: string;
        font: {
          primary: string;
          secondary: string;
        };
        primary: {
          red: string;
          green: string;
          blue: string;
          yellow: string;
          grey: string;
        };
        base: {
          red: string;
          green: string;
          blue: string;
          yellow: string;
          grey: string;
        };
      }

      interface Fonts {
        light: Font;
        regular: Font;
        bold: Font;
        black: Font;
      }

      interface Sizing {
        borderWidth: number;

        xsRadius: number;
        smRadius: number;
        mdRadius: number;
        nmRadius: number;
        lgRadius: number;
        xlRadius: number;
        xxlRadius: number;
        xxxlRadius: number;

        inputHeight: number;
        inputWidth: string | number;

        buttonHeight: number;
        buttonWidth: string | number;
      }

      interface Spacing {
        xs: number;
        sm: number;
        md: number;
        nm: number;
        lg: number;
        xl: number;
        xxl: number;
        xxxl: number;
      }
    }
  }

  namespace Judiye {
    namespace Theme {
      interface Colors {
        primary: string;
        background: string;
        backgroundPrimary: string;
        backgroundSecondary: string;

        text: string;
        textPrimary: string;
        textSecondary: string;

        linkText: string;
        linkContainer: string;

        errorText: string;
        errorContainer: string;

        inputOutline: string;
        inputOutlineFocused: string;
        inputOutlineErrored: string;
        inputLabelText: string;
        inputLabelBackground: string;
        inputLabelFocused: string;
        inputLabelErrored: string;
        inputErrorText: string;
        inputErrorContainer: string;
        inputContainer: string;
        inputValue: string;
        inputValueErrored: string;

        buttonPrimaryText: string;
        buttonPrimaryContainer: string;
        buttonPrimaryOutline: string;
        buttonSecondaryText: string;
        buttonSecondaryContainer: string;
        buttonSecondaryOutline: string;

        notification: string;
        notificationReadText: string;
        notificationReadContainer: string;
        notificationUnreadText: string;
        notificationUnreadContainer: string;

        ripple: string;

        // The color of surfaces such as cards, sheets, menus
        surfaceText: string;
        surfaceContainer: string;
        card: string;

        // A color meant to be used in element outlines
        border: string;

        // The scrim background that appears below modals and expanded navigation menus.
        scrimContainer: string;
        scrimText: string;
      }

      interface Sizing {
        avatarSize: number;

        borderWidth: number;

        headerHeight: number;
        bottomTabHeight: number;

        inputHeight: number;
        inputWidth: string | number;
        inputBorderRadius: number;
        inputBorderWidth: number;

        buttonHeight: number;
        buttonWidth: string | number;
        buttonBorderWidth: number;
        buttonBorderRadius: number;
        buttonIconSize: number;

        tabHeight: number;

        surfaceBorderRadius: number;
        borderRadius: number;
      }

      interface Spacing {
        screenPaddingHorizontal: number;
        screenPaddingTop: number;
        screenPaddingBottom: number;

        inputPaddingHorizontal: number;
        inputPaddingHorizontalPrePosfix: number;
        inputMarginBottom: number;
        inputLabelMarginLeft: number;
        inputLabelMarginBottom: number;
        inputErrorPaddingHorizontal: number;
        inputErrorLeft: number;
        inputErrorTop: number;
        inputPrefixPadding: number;
        inputPostfixPadding: number;
      }

      interface Fonts {
        regularFontFamily: string;
        regularFontWeight: string;

        boldFontFamily: string;
        boldFontWeight: string;

        defaultSize: number;
        inputLabelSize: number;
        inputErrorSize: number;
        lineHeight: number;
      }
    }

    interface Theme {
      colors: Judiye.Theme.Colors;
      dark: boolean;
      fonts: Judiye.Theme.Fonts;
      spacing: Judiye.Theme.Spacing;
      sizing: Judiye.Theme.Sizing;
      animation: ThemeAnimation;
    }

    interface ThemeAnimation {}
  }
}

// Override the theme in react native navigation.
declare module '@react-navigation/native' {
  export function useTheme(): Watfoe.Judiye.Theme;
}
