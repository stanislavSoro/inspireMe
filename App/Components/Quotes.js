import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import QuotesList from './QuotesList';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import style from '../Utils/styles';
const styles = StyleSheet.create(style);

class Quotes extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View style={styles.container}>
      <ScrollableTabView>
        <QuotesList navigator={this.props.navigator} setQuote={this.props.setQuote} tabLabel='Quotes' />
        <QuotesList isLiked={true} navigator={this.props.navigator} setQuote={this.props.setQuote} tabLabel='Liked' />
      </ScrollableTabView>
      <View style={styles.menu}>
        <TouchableHighlight style={styles.button} onPress={() => {
          this.props.navigator.pop();
        }}>
          <Text style={styles.buttonText}>Go back</Text>
        </TouchableHighlight>
      </View>
    </View>
  }
}

module.exports = Quotes;
