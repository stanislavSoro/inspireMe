import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';

import api from '../Utils/api';
import Quote from './Quote';
import BottomMenu from './BottomMenu';
import Icon from 'react-native-vector-icons/Entypo';

class Main extends Component {
  constructor(props){
    super(props);
    var self = this;

    /* sets quotes to the local storage */
    AsyncStorage.mergeItem('appData', JSON.stringify({quotes:api.getQuotes()}));

    this.like = this.like.bind(this);

    this.state = {
      quote: {}
    };

    AsyncStorage
    .getItem('appData')
    .then((data) => {
      return JSON.parse(data);
    })
    .then((appData) => {
        self.setState({quote: appData.quotes[0]});
      });

      this.setQuote = this.setQuote.bind(this);
    }
    like() {
      var quote = this.state.quote;
      quote.isFavorite = !quote.isFavorite;

      AsyncStorage
        .getItem('appData')
        .then((data) => {
          return JSON.parse(data);
        })
        .then((appData) => {
          for(let i = 0; i < appData.quotes.length; i++) {
            if (appData.quotes[i].id == quote.id) {
              appData.quotes[i].isFavorite = quote.isFavorite;
              break;
            }
          }

          AsyncStorage.setItem('appData', JSON.stringify(appData));
        });

      this.setState({
        quote: quote
      });
    }
    setQuote(quote) {
      this.setState({quote: quote});
    }
    render() {
      return <View style={styles.container}>
        <Text style={styles.titleText}>Hello, nice to see you today!</Text>
        <View style={styles.quote}>
          <Quote quote={this.state.quote} />
          <TouchableHighlight style={styles.mainLike} onPress={() => {
              this.like();
            }}>
            <Icon name="heart" size={70} color={(this.state.quote.isFavorite)? '#e74c3c' :'#bdc3c7'} />
          </TouchableHighlight>
        </View>
        <BottomMenu quote={this.state.quote} set={this.setQuote} navigator={this.props.navigator} />
      </View>
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#ecf0f1',
      justifyContent: 'space-between',
      padding: 20,
      paddingTop: 40
    },
    titleText: {
      color: '#2c3e50',
      fontSize: 34,
      fontWeight: 'bold'
    },
    quote: {
      marginTop: -40
    },
    mainLike: {
      marginTop: 50,
      marginBottom: -50,
      alignItems: 'center'
    }
  });

  module.exports = Main;
