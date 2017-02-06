import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';

export default class WeatherForecastRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    }
  }

  renderDetails() {
    if (! this.state.expanded) {
      return <View />;
    }
    else {
      const forecast = this.props.forecast;

      return (
        <View style={styles.details}>
          <Text style={styles.detail}>Feels Like: {forecast.feelsLikeTemp}</Text>
          <Text style={styles.detail}>Precipitation: {forecast.precipitation}</Text>
          <Text style={styles.detail}>Humidity: {forecast.humidity}</Text>
          <Text style={styles.detail}>Wind: {forecast.windSpeed} {forecast.windDirection}</Text>
        </View>
      );
    }
  }
  render() {
    const forecast = this.props.forecast;

    return (
      <TouchableHighlight onPress={() => this.setState({expanded: ! this.state.expanded})} underlayColor="#AAA">
        <View style={styles.row} onPress={() => this.setState({expanded: ! this.state.expanded})}>
          <Text style={styles.date}>{forecast.date}</Text>
          <Text style={styles.description}>{forecast.description}</Text>
          <View style={styles.temperatures}>
            <Text style={styles.temperatureMin}>Low of {forecast.minimumTemp}</Text>
            <Text style={styles.temperatureAvg}>Average of {forecast.averageTemp}</Text>
            <Text style={styles.temperatureMax}>High of {forecast.maximumTemp}</Text>
          </View>
          {this.renderDetails()}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
  },
  rowTouch: {
    opacity: 0.1,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
  },
  temperatures: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  temperatureMin: {
    color: 'red',
  },
  temperatureAvg: {
    color: 'blue',
  },
  temperatureMax: {
    color: 'green',
  },
  details: {
    margin: 15,
  },
  detail: {
    textAlign: 'center',
    color: '#444',
  },
});
