import React, { useState } from "react";
import { Provider } from "react-redux";
import Main from "./Main"
import Store from "./store";
//create store
// 3. providing store to main function
const store = Store()

const Counter = () => {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    )
}
export default Counter