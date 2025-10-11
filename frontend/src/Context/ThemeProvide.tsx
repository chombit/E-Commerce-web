import { useEffect, useState } from "react"
import type { ThemeContextType } from "./ThemeContext"
import ThemeContext from "./ThemeContext"

interface Themeprops{
     children:React.ReactNode
}
function Themeprov({children}:Themeprops){
    const [theme,settheme]=useState<'light'|'dark'>('light')
    const toogleTheme=()=>{
        settheme((prevThem)=> prevThem=='light'?'dark':'light')
    }
    useEffect(()=>{
        if(theme=='dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }

    },[theme])
    const value:ThemeContextType ={theme,toogleTheme};
    return(
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}
export default Themeprov