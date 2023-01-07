//need reducers that start with states
// Writing Reducers
// Now that we know what our state structure and our actions look like, it's time to write our first reducer.
// Reducers are functions that take the current state and an action as arguments, 
// and return a new state result. In other words, (state, action) => newState.


// 1.start of state and actions

const Count = (state={count:0},action) =>{
    switch(action.type){
        case 'Increment':
            return {...state,count:state.count+1}
        case 'Decrement':
            return {...state,count:state.count-1}
        case 'reset':
            return {...state,count:0}
        case 'IncrementByValue':
            return {...state,count:state.count+action.payload}
        default:
            return state
    }
}

export default Count