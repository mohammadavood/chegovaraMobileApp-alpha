/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,AppState} from 'react-native';

import codePush from 'react-native-code-push';
import Push from 'appcenter-push'


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}
const codePushWrapped = codePush(App)
export default codePushWrapped
//---------------------------

Push.setListener({
  onPushNotificationReceived: function (pushNotification) {
    let message = pushNotification.message;
    let title = pushNotification.title;
    console.log('notif received in main func---------------------------------------------------')
    console.log("pushNotification  :  ",pushNotification )
    if (message === null) {
      // Android messages received in the background don't include a message. On Android, that fact can be used to
      // check if the message was received in the background or foreground. For iOS the message is always present.
      title = 'Android background';
      message = '<empty>';
      console.log('notif received in null---------------------------------------------------')
    }

    // Custom name/value pairs set in the App Center web portal are in customProperties
    if (pushNotification.customProperties && Object.keys(pushNotification.customProperties).length > 0) {
      message += '\nCustom properties:\n' + JSON.stringify(pushNotification.customProperties);
      console.log('notif received in custom prop---------------------------------------------------')
    }

    if (AppState.currentState === 'active') {
      Alert.alert(title, message);
      console.log('notif received in forground---------------------------------------------------')
    }
    else {
      console.log('notif received in background--------------------------------------------------')
      // Sometimes the push callback is received shortly before the app is fully active in the foreground.
      // In this case you'll want to save off the notification info and wait until the app is fully shown
      // in the foreground before displaying any UI. You could use AppState.addEventListener to be notified
      // when the app is fully in the foreground.
    }
  }
});



// -------------------------
const styles = StyleSheet.create({
  container: {  
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
