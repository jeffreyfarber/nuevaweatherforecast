import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View, ListView } from 'react-native';
import WeatherForecastRow from './weatherForecastRow.js';

export default class WeatherForecast extends Component {
  constructor(props) {
    super(props);
  }

  renderCurrentLocationMessage() {
    const city = this.props.city;

    if (city) {
      return (
        <Text style={styles.displayLocation}>
          Showing weather for: {city}
        </Text>
      );
    }
    else {
      return (
        <Text style={styles.displayLocation}>
          Type and hit Go!
        </Text>
      );
    }
  }

  render() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(this.props.forecast);

    return (
      <View>
        {this.renderCurrentLocationMessage()}
        <ListView
          dataSource={dataSource}
          renderRow={(forecast) => <WeatherForecastRow forecast={forecast} />}
          enableEmptySections={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  displayLocation: {
    textAlign: 'center',
    fontSize: 16,
    margin: 15,
  },
});

