import { PixelRatio } from 'react-native';

import { COLORS } from './colors';
import { mvs } from './responsive';

const fontScaleRatio = (value: number) => value / PixelRatio.getFontScale();

export const FONT_FAMILY = {
  bold: 'Roboto-Bold',
  semibold: 'Roboto-SemiBold',
  medium: 'Roboto-Medium',
  regular: 'Roboto-Regular',
};

export const SIZE = {
  10: fontScaleRatio(mvs(10)),
  11: fontScaleRatio(mvs(11)),
  12: fontScaleRatio(mvs(12)),
  13: fontScaleRatio(mvs(13)),
  14: fontScaleRatio(mvs(14)),
  15: fontScaleRatio(mvs(15)),
  16: fontScaleRatio(mvs(16)),
  17: fontScaleRatio(mvs(17)),
  18: fontScaleRatio(mvs(18)),
  20: fontScaleRatio(mvs(20)),
  24: fontScaleRatio(mvs(24)),
  30: fontScaleRatio(mvs(30)),
  34: fontScaleRatio(mvs(34)),
  36: fontScaleRatio(mvs(36)),
  40: fontScaleRatio(mvs(40)),
};

const fontPropertiesGenerator = (fontFamily: string, fontSize: number) => {
  return {
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: COLORS.black[1],
    lineHeight: mvs(20),
  };
};
// Bold: 700
// Semibold: 600
// Medium: 500
// Regular: 400
export const FONTS = {
  B36: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[36]),
  B34: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[34]),
  B30: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[30]),
  B24: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[24]),
  B20: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[20]),
  B18: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[18]),
  B16: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[16]),
  B14: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[14]),
  B12: fontPropertiesGenerator(FONT_FAMILY.bold, SIZE[12]),
  SB24: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[24]),
  SB20: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[20]),
  SB18: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[18]),
  SB17: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[17]),
  SB16: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[16]),
  SB15: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[15]),
  SB14: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[14]),
  SB12: fontPropertiesGenerator(FONT_FAMILY.semibold, SIZE[12]),
  M17: fontPropertiesGenerator(FONT_FAMILY.medium, SIZE[17]),
  M16: fontPropertiesGenerator(FONT_FAMILY.medium, SIZE[16]),
  M15: fontPropertiesGenerator(FONT_FAMILY.medium, SIZE[15]),
  M14: fontPropertiesGenerator(FONT_FAMILY.medium, SIZE[14]),
  M12: fontPropertiesGenerator(FONT_FAMILY.medium, SIZE[12]),
  R20: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[20]),
  R18: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[18]),
  R17: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[17]),
  R16: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[16]),
  R15: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[15]),
  R14: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[14]),
  R13: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[13]),
  R12: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[12]),
  R11: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[11]),
  R10: fontPropertiesGenerator(FONT_FAMILY.regular, SIZE[10]),
};
