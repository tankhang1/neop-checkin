import { COLORS } from '@/utils/theme/colors';
import { FONTS } from '@/utils/theme/fonts';
import { s, vs } from '@/utils/theme/responsive';

export const theme = {
  variant: {
    primary: {
      backgroundColor: COLORS.blue[5],
      color: COLORS.white[1],
      borderRadius: s(8),
    },
    outline: {
      backgroundColor: COLORS.white[1],
      color: COLORS.black[2],
      borderRadius: s(8),
      borderColor: COLORS.blue[3],
      borderWidth: s(1),
    },
    transparent: {
      backgroundColor: 'transparent',
      color: COLORS.blue[2],
    },
  },
  fontSize: {
    m17: FONTS.M17,
    sb14: FONTS.SB14,
  },
  spacing: {
    xs: {
      padding: vs(6),
    },
    sm: {
      padding: vs(8),
    },
    md: {
      padding: vs(13),
    },
  },
};
