import React from 'react'
import UseNetworkStatus from './Custom hooks/UseNetworkStatus';

const NetworkStatus = () => {
    const networkStatus = UseNetworkStatus()
  return (
    <div>
        <p
            style={{color: networkStatus ? 'green' : 'red'}}
        > {networkStatus ? 'You are online !' : 'You are offline...'} 
        </p>

    </div>
  )
}

export default NetworkStatus;