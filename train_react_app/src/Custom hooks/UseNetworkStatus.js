import React, {useEffect, useState} from 'react'

const UseNetworkStatus = () => {
    const [networkStatus, setNetworkStatus] = useState(navigator.onLine)
  
    useEffect(()=> {
        window.addEventListener('offline', ()=> setNetworkStatus(navigator.onLine));
        window.addEventListener('online', ()=> setNetworkStatus(navigator.onLine));
    }, [])
  
    return networkStatus;
}

export default UseNetworkStatus;