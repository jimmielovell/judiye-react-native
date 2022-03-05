import {sizing as watfoeSizing} from '../watfoe/sizing';

const sizing: Judiye.Theme.Sizing = {
  avatarSize: 34,
  avatarRadius: 15,
  headerHeight: 55,
  bottomTabHeight: 60,

  inputHeight: watfoeSizing.inputHeight,
  inputWidth: watfoeSizing.inputWidth,
  inputBorderRadius: watfoeSizing.mdRadius,
  inputBorderWidth: watfoeSizing.borderWidth,

  buttonHeight: watfoeSizing.buttonHeight,
  buttonWidth: watfoeSizing.buttonWidth,
  buttonBorderWidth: watfoeSizing.borderWidth,
  buttonBorderRadius: watfoeSizing.xxlRadius,
  buttonIconSize: 34,

  surfaceBorderRadius: watfoeSizing.nmRadius,
  borderRadius: watfoeSizing.nmRadius,
};

export default sizing;