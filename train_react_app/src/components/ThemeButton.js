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

    const toggleTheme = () => {
        themeMode === 'dark' ? lightTheme() : darkTheme();
      };

  return (

//     <label className="flex items-center cursor-pointer">
//     <input
//       type="checkbox"
//       className="sr-only"
//       onChange={toggleTheme}
//       checked={themeMode === 'dark'}
//     />
//     <div className="relative w-14 h-7 bg-gray-400 rounded-full shadow-inner"></div>
//     <div
//       className={`absolute w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
//         themeMode === 'dark' ? 'translate-x-7' : ''
//       }`}
//     ></div>
//   </label>
    
<label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only"
                onChange={onChangeButton}
                checked={themeMode === 'dark'}
            />
            <div className="w-11 h-6 bg-blue-400 rounded-full p-1 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 transition-transform duration-300 ease-in-out transform">
                <div
                    className={`h-4 w-4 bg-white rounded-full shadow-md transform ${
                        themeMode === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                    } transition-transform duration-5000 ease-in-out`}
                ></div>
            </div>
        </label>

  )
}

export default ThemeButton;
