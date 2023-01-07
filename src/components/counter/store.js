import { configureStore  } from '@reduxjs/toolkit'
import Count from './reducers'

// 2.acquiring of state and actions from store
const Store = () => {
    const store = configureStore({

        reducer: {
            Count: Count
        }
    }
    
    )

    return store

}

export default Store