import React, { Component } from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Modal
} from 'react-native';

import Quotes from './Quotes';
import style from '../Utils/styles';
const styles = StyleSheet.create(style);

const FBSDK = require('react-native-fbsdk');
// const {
//   ShareDialog
// } = FBSDK;

var ShareDialog = FBSDK.ShareDialog;

const shareLinkContent = {
  contentType: 'link',
  contentUrl: "https://facebook.com",
  contentDescription: 'Facebook sharing is easy!',
};

class BottomMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.shareLinkWithShareDialog = this.shareLinkWithShareDialog.bind(this);
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  shareLinkWithShareDialog() {
    var tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: '
          + result.postId);
        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
  }
  goToQuotes() {
    this.props.navigator.push({
      component: Quotes,
      passProps: {
        setQuote: this.props.set
      }
    });
  }
  render() {
    var self = this;

    let socials = [{
      key: 'facebook',
      action() {
        self.shareLinkWithShareDialog();
      }
    }, {
      key: 'vk'
    }, {
      key: 'twitter'
    }, {
      key: 'instagram'
    }];

    socials = socials.map((el) => {
      return <TouchableHighlight onPress={() => {
          el.action();
        }} style={styles.socialBtn} key={el.key}><Text style={styles.socialBtnText}>{el.key}</Text></TouchableHighlight>
      });

      return <View style={styles.menu}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          >
          <View style={styles.container}>
            <View>
              <Text style={styles.titleText}>Share your inspiration in social networks!</Text>
              <View style={styles.socialBtnWrapper}>
                {socials}
              </View>
            </View>

            <View style={styles.menu}>
              <TouchableHighlight style={styles.button} onPress={() => {
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                <Text style={styles.buttonText}>Go back</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight onPress={() => {
            this.goToQuotes()
          }} style={styles.button}>
          <Text style={styles.buttonText}>Quotes</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {
            this.setModalVisible(true);
          }} style={styles.button}>
          <Text style={styles.buttonText}>Share</Text>
        </TouchableHighlight>
      </View>
    }
  }

  module.exports = BottomMenu;
