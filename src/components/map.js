import React from 'react';
import { Text, StyleSheet, Image, Button, SafeAreaView, View } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Circle, Polyline, Callout } from 'react-native-maps';
import { connect } from 'react-redux'
import { createMarker, getMarkers } from '../actions/markers'


export class App extends React.Component {
  styles = StyleSheet.create({
    flex: {
      flex: 1,
    }
  })

  state = {
    currentPosition: null,
    coordinates: [],
  }

  componentDidMount() {
    this.props.getMarkers();
    Geolocation.watchPosition(
      ({ coords }) => {
        this.setState((state) => ({
          currentPosition: {
            ...coords,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
          coordinates: [
            ...state.coordinates,
            { latitude: coords.latitude, longitude: coords.longitude }
          ],
        }))
      },
      console.log,
      {
        enableHighAccuracy: true,
        distanceFilter: 0,
      }
    );
  }

  onMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    this.props.createMarker(
      coordinate,
    );
  }

  render() {
    if (!this.state.currentPosition) return null;
    console.log(this.props);
    return (
        <MapView
          style={this.styles.flex}
          initialRegion={this.state.currentPosition}
          onPress={this.onMapPress}
        >
          <Circle
            center={this.state.currentPosition}
            radius = {250}
          />
          {
            this.props.markers.map(marker => (
              <Marker
                onPress={e => e.stopPropagation()}
                key={`${marker.coordinate.longitude}_${marker.coordinate.latitude}`}
                { ...marker}
              />
            ))
          }
        </MapView>
    );
  }
}

const select = ({markers}) => ({markers});
const mapDispatchToProps = {createMarker, getMarkers};

export default connect (select, mapDispatchToProps)(App);
