import React from 'react';
import {SageAreaView, Text} from 'react-native';
import Map from './src/components/map';
import {Provider} from 'react-redux'
import store from './src/store/store'

export default class App extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <Map />
      </Provider>
    );
  }
}
