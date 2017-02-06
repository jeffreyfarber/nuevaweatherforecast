import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import WeatherLocationForm from './weatherLocationForm.js'
import WeatherForecast from './weatherForecast.js'
import {getForecastForCity} from './weatherAPI.js';

export default class NuevaWeatherForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      forecast: [],
    };
  }

  doSearch(city) {
    getForecastForCity(city).then(searchResult => {
      if (searchResult.error) {
        this.setState({error: true});
      }
      else {
        this.setState({
          error: false,
          city: searchResult.city,
          forecast: searchResult.forecast,
        });
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <WeatherLocationForm
          doSearch={(city) => this.doSearch(city)}
        />
        <WeatherForecast
          city={this.state.city}
          forecast={this.state.forecast}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: '#EEE',
  },
});

AppRegistry.registerComponent('NuevaWeatherForecast', () => NuevaWeatherForecast);
