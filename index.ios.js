/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

import Main from './App/Components/Main';

class inspireMe extends Component {
  renderScene(route, navigator) {
    let RouteComponent = route.component;
    return <RouteComponent navigator={navigator} {...route.passProps} />
  }
  render() {
    return (
      <Navigator
        style= {styles.container}
        initialRoute= {{
          component: Main
        }}
        renderScene={this.renderScene}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FloatFromRight}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  }
});

AppRegistry.registerComponent('inspireMe', () => inspireMe);
