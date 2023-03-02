import '@react-navigation/native';

export type FontWeight =
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | 'bold'
  | 'normal';

export interface FontFamily {
  light?: string;
  regular?: string;
  medium?: string;
  bold?: string;
}

export type FontAppearance =
  | 'primary'
  | 'secondary'
  | 'link'
  | 'success'
  | 'error'
  | 'warning';

export type FontVariant =
  | 'title'
  | 'subtitle'
  | 'body'
  | 'description'
  | 'label'
  | 'chip';

export type FontSizeName = 'light' | 'regular' | 'medium' | 'bold';

export interface Font {
  family?: string;
  size: number;
  weight: FontWeight;
}

declare global {
  namespace Watfoe {
    namespace Theme {
      interface Colors {
        black: {
          primary: string;
          secondary: string;
        };
        white: {
          primary: string;
          secondary: string;
        };
        red: {
          main: string;
          light: string;
          dark: string;
        };
        green: {
          main: string;
          light: string;
          dark: string;
        };
        blue: {
          main: string;
          light: string;
          dark: string;
        };
        yellow: {
          main: string;
          light: string;
          dark: string;
        };
      }

      // The default Watfoe font used across all devices
      interface Fonts {
        family: string;

        size: {
          title: number;
          subtitle: number;
          body: number;
          description: number;
          label?: number;
          chip?: number;
        };

        weight: {
          title: FontWeight;
          subtitle: FontWeight;
          body: FontWeight;
          description: FontWeight;
          label?: FontWeight;
          chip?: FontWeight;
        };

        letterSpacing: number;
        lineHeight: number;
      }

      interface Sizing {
        border: {
          width: number;
        };
        height: {
          sm: number;
          nm: number;
          lg: number;
        };
        width: {
          sm: number;
          nm: number;
          lg: number;
        };
      }

      interface Shape {
        radius: {
          xs: number;
          sm: number;
          nm: number;
          md: number;
          lg: number;
        };
      }

      interface Spacing {
        xxs: number;
        xs: number; // Extra-Small
        sm: number; // Small
        nm: number; // Normal
        md: number; // Medium
        lg: number; // Large
        xlg: number;
      }
    }
  }

  namespace Judiye {
    namespace Theme {
      interface Colors {
        // Needed by the theme
        primary: string;

        background: string;

        text: {
          primary: string;
          secondary: string;
          link: string;
          success: string;
          warning: string;
          error: string;
        };

        // A color meant to be used in element outlines
        border: {
          primary: string;
          secondary: string;
        };

        actions: {
          active: string;
          disabled: string;
          focused: string;
          success: string;
          warning: string;
          error: string;
        };

        ripple: string;

        // The color of surfaces such as cards, sheets, menus
        surface: {
          primary: string;
          secondary: string;
          link: string;
          success: string;
          warning: string;
          error: string;
        };

        // The scrim background that appears below modals and expanded navigation menus.
        scrim: string;
      }
    }

    interface Theme {
      colors: Theme.Colors;
      fonts: Watfoe.Theme.Fonts;
      sizing: Watfoe.Theme.Sizing;
      shape: Watfoe.Theme.Shape;
      spacing: Watfoe.Theme.Spacing;
      dark: boolean;
    }

    // interface ThemeAnimation {}
  }
}

// Override the theme in react native navigation.
declare module '@react-navigation/native' {
  export function useTheme(): Judiye.Theme;
}
