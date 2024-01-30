import React from 'react'
import UseNetworkStatus from './Custom hooks/UseNetworkStatus';

const NetworkStatus = () => {
    const networkStatus = UseNetworkStatus()
  return (
    <div>
        <p
            style={{color: networkStatus ? 'green' : 'red'}}
        >{networkStatus ? 'Connecté à internet !' : 'Déconnecté d\'internet...'} 
        </p>

    </div>
  )
}

export default NetworkStatus;