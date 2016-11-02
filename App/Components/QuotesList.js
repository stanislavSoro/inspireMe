import React, { Component } from 'react';
import api from '../Utils/api';

import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  AsyncStorage
} from 'react-native';

import style from '../Utils/styles';

import Icon from 'react-native-vector-icons/Entypo';
const myIcon = (<Icon name="heart" size={30} color="#bdc3c7" />);

const styles = StyleSheet.create(style);

class QuoteEl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: props.quote
    }
  }
  render() {
    let quote = this.state.quote;
    return <View style={styles.socialBtn}>
      <TouchableHighlight style={{flex: 1}} onPress={() => {
          this.props.selectQuote(quote);
        }} key={quote.id}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.socialBtnText}>{quote.author}</Text>
          <View>
            <Icon name="heart" size={30} color={(quote.isFavorite)? '#e74c3c' :'#bdc3c7'} />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  }
}


class QuotesList extends Component {
  constructor(props) {
    super(props);
    this.selectQuote = this.selectQuote.bind(this);
    this.state = {
      quotes: []
    }
    var self = this;

    AsyncStorage
      .getItem('appData')
      .then((data) => {
        return JSON.parse(data);
      })
      .then(function(appData){
        let likedQuotes = [],
          i;

        if (props.isLiked) {
          for(i = 0; i < appData.quotes.length; i++) {
            if (appData.quotes[i].isFavorite) {
              likedQuotes.push(appData.quotes[i]);
            }
          }
          appData.quotes = likedQuotes;
        }

        self.setState({
          quotes: appData.quotes
        });
      });
  }
  selectQuote(quote) {
    this.props.setQuote(quote);
    this.props.navigator.pop();
  }
  render() {
    let initDate = new Date(1471467600000),
    today = (new Date()).setHours(0,0,0,0), //.getTime()
    nexDate = initDate,
    i;

    let quotesList = this.state.quotes,
    parsedList = [];

    for(i = 0; i < quotesList.length; i++) {
      var quote = quotesList[i];
      if (true || today >= nexDate.getTime()) {
        parsedList.push(<QuoteEl key={i} quote={quote} selectQuote={this.selectQuote} />);
      }
      if (i > 0 && ((i + 1) % 6 == 0)) {
        let name = 'admob-' + i;
        // parsedList.push(<AdMobBanner
        //   key={name}
        //   style={styles.socialBtn}
        //   bannerSize={'S001'}
        //   testDeviceID="EMULATOR"
        //   adUnitID="ca-app-pub-9969065267678684/8778122851"
        // />);
      }
      nexDate.setDate(nexDate.getDate() + 1);
    }

    quotesList = quotesList.map((quote) => {
      return <TouchableHighlight style={styles.socialBtn} key={quote.id}><Text style={styles.socialBtnText}>{quote.author}</Text></TouchableHighlight>
    });

    return <ScrollView>
      {parsedList}
    </ScrollView>
  }
}

module.exports = QuotesList;
