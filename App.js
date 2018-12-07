import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './src/components/Home';
import {ScreenSwitcher} from './src/routers/router';

export default class App extends React.Component {
  render() {
    return (<ScreenSwitcher/>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
