import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

class Quote extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <View>
        <Text style={styles.quote}>"{this.props.quote.quote}"</Text>
        <Text style={styles.author}>{this.props.quote.author}</Text>
      </View>
  }
}

const styles = StyleSheet.create({
  quote: {
    fontStyle: 'italic',
    fontSize: 24
  },
  author: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 18
  }
});

module.exports = Quote;
