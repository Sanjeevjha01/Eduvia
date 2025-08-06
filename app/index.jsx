import React from 'react'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Main from '../screens/Main'

const index = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}

export default index