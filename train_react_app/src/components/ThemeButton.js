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
            type='checkbox'
            value=''
            className='sr-only peer'
            onChange={onChangeButton}
            checked={themeMode ==='dark'}
        />
        <div className='w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
        peer-focus:ring-blue-300
        dark:peer-focus:ring-blue-800 rounded-full peer
        dark:bg-gray-700
        peer-checked:after:translate-x-full '>

        </div>
    </label>
  )
}

export default ThemeButton;
