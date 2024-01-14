import React from 'react'
import useTheme from '../contexts/theme.context';

 function ThemeButton() {
    const {themeMode, lightTheme, darkTheme} = useTheme()
    const onChangeButton = (e)=> {
        const darkModeStatus = e.currentTarget.checked
        console.log("Dark mode status:", darkModeStatus);
        if (darkModeStatus) darkTheme() 
        else lightTheme ()
    }
  return (
    <label className="relative inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            value=""
            className="sr-only"
            onChange={onChangeButton}
            checked={themeMode === 'dark'}
        />
        <div className="w-11 h-6 bg-blue-400 rounded-full p-1 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 transition-transform duration-300 ease-in-out transform">
            <div className={`h-4 w-4 rounded-full shadow-md transform absolute ${
                themeMode === 'dark' ? 'right-1 bg-black' : 'left-1 bg-white'
                } transition-transform duration-5000 ease-in-out`}
                >   
            </div>
        </div>
    </label>
  )
}

export default ThemeButton;
