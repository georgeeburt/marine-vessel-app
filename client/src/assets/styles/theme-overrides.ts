import type { GlobalThemeOverrides } from "naive-ui";

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#4D6BFE',
    primaryColorPressed: '#3c53c4',
    textColorBase: '#D8D8D9',
    textColor1: '#D8D8D9',
    textColor2: '#D8D8D9',
    borderRadius: '5px',
    borderColor: '#4D6BFE',
    hoverColor: '#4D6BFE',
    primaryColorHover: '#7b92ff',
  },
  Card: {
    color: '#283783',
    borderRadius: '5px',
    borderColor: '#384db4',
    textColor: '#dbdbdb',
    titleFontWeight: '200',
    titleFontSizeMedium: '17px',
  },
  Dialog: {
    color: '#1B2454',
    negativeColor: '#4D6BFE',
    closeIconColor: '#4D6BFE',
  },
  Input: {
    backgroundColor: '#141a3d',
    iconColor: '#7c7c7c',
    borderColorSuccess: '#4D6BFE',
    boxShadowFocusSuccess: 'none',
    color: '#141a3d',
    colorFocus: '#10142e',
    colorFocusError: '#10142e',
    colorFocusWarning: '#10142e',
    colorFocusSuccess: '#10142e',
    colorFocusInfo: '#10142e',
    textColor: '#b2b2b2',
    placeholderColor: '#7c7c7c',
  },
  Message: {
    colorError: '#293783',
    colorSuccess: '#293783',
    textColor: '#ffffff',
    closeIconColor: '#4D6BFE',
  },
  Tooltip: {
    textColor: '#D8D8D8',
    color: '#141A3C',
  },
};
