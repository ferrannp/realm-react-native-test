// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Realm from 'realm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null };
  }

  componentWillMount() {
    Realm.open({
      schema: [{ name: 'Dog', properties: { name: 'string' } }],
    }).then(realm => {
      realm.write(() => {
        realm.create('Dog', { name: 'Rex' });
      });
      this.setState({ realm });
    });
  }

  render() {
    const info = this.state.realm
      ? `Number of dogs in this Realm: ${
          this.state.realm.objects('Dog').length
        }`
      : 'Loading...';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{info}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;
