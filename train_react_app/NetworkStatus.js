import React from 'react'
import UseNetworkStatus from './Custom hooks/UseNetworkStatus';

const NetworkStatus = () => {
    const networkStatus = UseNetworkStatus()
  return (
    <div>
        <h2> Network Status</h2>
        <p
            Style={{color: networkStatus ? 'green' : 'red'}}
        > {networkStatus ? 'You are online !' : 'You are offline...'} 
        </p>

    </div>
  )
}

export default NetworkStatus;