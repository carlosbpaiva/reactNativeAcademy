import React, { Component } from 'react';
import { View, Button } from 'react-native';

export default class Tabs extends Component {
  render() {
    return(
      <View style={{
          backgroundColor: 'rgb(196, 196, 196)',
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}>
        <Button onPress={this.props.setScreen(0)} title='Tab 1' />
        <Button onPress={this.props.setScreen(1)} title='Tab 2' />
      </View>
    );
  }
}
