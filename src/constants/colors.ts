 export const Colors = {
   primary: "#B4281F",  
  onPrimary: "#FFFFFF",

   background: "#F6F3EC",  
  card: "#FFFFFF",
  inputBg: "#FBFAF6",
  map: "#E4EADF",

   ink: "#14211C",  
  onInk: "#FFFFFF",
  muted: "#5B645F", 

   border: "#E3DED2", 
  inputBorder: "#D3CDBF",
  divider: "#EEE9DD",  
  routeDots: "#B7B09F", 
} as const;

 export const Vehicle = {
  sajha: { bg: "#DDF0E5", text: "#14663F" },
  micro: { bg: "#DCE6F7", text: "#1F4E9C" },
  tempo: { bg: "#FBE6D3", text: "#8F3F07" },
} as const;

export type VehicleType = keyof typeof Vehicle;

