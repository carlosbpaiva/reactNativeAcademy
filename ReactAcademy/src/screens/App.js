/* React Native Academy */
import React, { Component } from 'react';

import { View, SafeAreaView, Text, TextInput, Button, AsyncStorage,TouchableOpacity } from 'react-native';
import styles from './AppStyle';
import Tabs from '../components/Tabs';

const ELEMENT_VALUE_KEY = 'ELEMENT_VALUE_KEY';

export default class App extends Component<Props> {
  state = {
    screen: 0,
    text: '',
    elements: []
  }

  async componentDidMount() {
    const elements = await AsyncStorage.getItem(ELEMENT_VALUE_KEY);
    this.setState({elements: JSON.parse(elements) || [] });
  }

  setScreen = (screen) => () => this.setState({ screen });

  removeElement = (element) => () => this.setState({elements: this.state.elements.filter(elem => elem !== element) });

  setText = (text) => this.setState({text});

  addElement = () => this.setState({ elements: [...this.state.elements, this.state.text] }, async () => {
      this.setState({ text:'' });
      await AsyncStorage.setItem( ELEMENT_VALUE_KEY, JSON.stringify(this.state.elements) );
  });

  renderContent() {
      switch( this.state.screen ) {
        case 0:
          return (
            <View style={{flex: 1, width: '100%'}}>
              <TextInput
                placeholder='write your text'
                onChangeText={this.setText}
                value={this.state.text}
                style={{ padding: 20,
                  fontSize: 18,
                  color: 333,
                  borderBottomColor: 'red',
                  borderWidth: 1 }}
              />
              <Button onPress={this.addElement} title='Add' />
            </View>
          );

        case 1:
          return (
            <View style={{ flex: 1, width: '100%' }}>
              {this.state.elements.map( (element, index) => (
                  < View style={{
                    paddingRight: 40,
                    padding: 5, 
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between' 
                  }} key={index}>
                    <Text style={{fontSize: 18, color: '#467'}}>{element}</Text>
                    <TouchableOpacity onPress={this.removeElement(element)}>
                        <Text>X</Text>
                    </TouchableOpacity>
                  </View>
              ))}
            </View>
          );

        default:
          return null;
      }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          { this.renderContent() }
        </View>
        <Tabs setScreen={this.setScreen}/>
      </SafeAreaView>
    );
  }
}
