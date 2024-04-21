export const customFontsToLoad = {}

const fonts = {
  system: {
    // You can use the default system fonts here.
    light: {
      fontWeight: "300",
    },
    normal: {
      fontWeight: "400",
    },
    medium: {
      fontWeight: "500",
    },
    bold: {
      fontWeight: "700",
    },
  },
}

export const typography = {
  fonts,
  primary: fonts.system, // You can use the system font as the primary font.
  heading: fonts.system, // Or use the system font for headings as well.
}
