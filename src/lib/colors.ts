export const colors = {
    "black-0": "#ffffff",
    "black-45": "#bababa",
    "black-50": "#a8a8a8",
    "black-70": "#626262",
    "black-90": "#333333",
    "black-100": "#000000",
    "main": "#d6c7fe",
    "secondary": "#b89dff",
    "accent": "#895cff",
    "icon-background": "#f2f4f7",
    "error": "#eb4c60",
    "success": "#1cd069",
} as const
export type Color = keyof typeof colors /*| `#${string}`*/
export const getColor = (clr: Color | string) => {
    if (clr in colors) return colors[clr as keyof typeof colors]
    else return clr
}
