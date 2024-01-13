import {createContext, useContext} from 'react';

export const ThemeContext = createContext({
    themeMode: 'light',
    darkTheme: ()=>{console.log("Dark theme activated!")},
    lightTheme: ()=>{ console.log("Light theme activated!")},
});

export const ThemeProvider = ThemeContext.Provider;

export default function useTheme() {
    return useContext(ThemeContext)
}