const palette = {
  neutral100: "#FFFFFF",
  neutral200: "#F1F2ED",  // Light gray
  neutral200trans: "#66000000",  // Light gray

  neutral300: "#C8C7CC",  // Slightly darker gray
  neutral400: "#000000",  // Black for text

  primary100: "#000",
  primary200: "#000",  // Adjusted primary 200
  primary300: "#FFF7D2",  // Adjusted primary 300
  primary400: "#fcf8e6",  // Adjusted primary 400
  primary500: "#fcf8e6",  // Adjusted primary 400

  secondary100: "#215E7C",  // Set secondary color to #3db0e1
  secondary200: "#60A4C6",  // Adjusted lighter shade
  secondary300: "#60A4C6",
  secondary400: "#60A4C6",
  secondary500: "#8D3E50",
  secondary600: "#B22518",
  secondary700: "#4267B2",

  shadow: "#00000040",
  activeButton: "#027368",
  activeButtonSemi: "#02736866",
  black: "#000000",
  grey: "#D9D9D9",
  Map_Primary: "#6598B8",
  coverText: "#D4D4D4",
  borderLine: "#D1D1D1",
  messageBox: "#D2D2D2",
  danger: "#F24130",
  green:"#099000"
} as const;

export const colors = {
  palette,
  transparent: "rgba(0, 0, 0, 0)",
  text: palette.neutral400,
  inactiveText: palette.neutral300,
  background: palette.neutral200,
  border: palette.primary200,
  separator: "#C8C8C8",
  error: palette.secondary500,
  textFieldBackground: "rgba(246, 246, 246, 1)",
  textFieldError: "rgba(141, 62, 80, 0.5)",
  calenderAvailable: "rgba(2, 115, 104, 0.5)",
  cta01: palette.primary200,
  cardWidget: palette.neutral200,
  cta02: palette.primary100,
  messageBox: palette.neutral300,
  ctaInactive: "#ECD1C8",
  navInactive: palette.neutral100,
  mapRadius: "rgba(101, 152, 184, 0.5)",
  mapPrimary: "#6598B8",
  shadow: palette.shadow,
  activeButton: palette.activeButton,
  black: palette.black,
  searchbar: palette.grey,
  inputBackground: '#EEEEEE',
  inputBorder: '#d0d0d0',
  bg_main: '#EEEEEE',

  Map_Primary: palette.Map_Primary,
  coverText: palette.coverText,
  borderLine: palette.primary200,
  danger: palette.danger,
  activeButtonSemi: palette.activeButtonSemi,
};
