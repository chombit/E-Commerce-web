
import { createContext } from "react";
export interface ThemeContextType{
   theme:"dark" | "light";
   toogleTheme:()=>void;
}

const ThemeContext=createContext<ThemeContextType |null>(null);
export default ThemeContext