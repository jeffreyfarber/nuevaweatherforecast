import React, { Component } from 'react';
import { AppRegistry, StyleSheet, TextInput, Button, View } from 'react-native';

export default class WeatherLocationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };
  }

  setCity(city) {
    this.setState({city: city});
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.cityInput}
          placeholder="Pick a city!"
          onChangeText={(text) => this.setState({city: text})}
        />
        <Button
          style={styles.searchButton}
          onPress={() => this.props.doSearch(this.state.city)}
          title="Go!"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cityInput: {
    height: 40,
    backgroundColor: 'lightcyan',
    margin: 10,
    padding: 5,
    borderWidth: 1,
    flex: 4,
  },
  searchButton: {
    flex: 1,
  }
});
