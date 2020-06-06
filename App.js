/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Animated,
  View,
  Text,
  StatusBar,
  Dimensions
} from 'react-native';


import Carousel, { getInputRangeFromIndexes } from 'react-native-snap-carousel';


class App extends React.Component {

  _scrollInterpolator(index, carouselProps) {
    const range = [1, 0, -1];
    const inputRange = getInputRangeFromIndexes(range, index, carouselProps);
    const outputRange = range;
    return { inputRange, outputRange };
  }
  renderItem = ({ item, index, animatedValue }) => {
    const animatedStyle = this._animatedStyles(index, animatedValue);
    const animatedTextStyle = this._animatedtextStyles(index, animatedValue)
    return (
      <Animated.View style={[animatedStyle, {
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center'
      }]}>
        <Animated.Text style={animatedTextStyle}>{item}</Animated.Text>
      </Animated.View>
    )
  }

  _animatedStyles(index, animatedValue) {
    return {
      backgroundColor: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['#fff', '#312C1D', '#fff']
      }),
    };
  }

  _animatedtextStyles(index, animatedValue, ) {
    return {
      color: animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['#312C1D', '#fff', '#312C1D']
      }),
      fontSize:  animatedValue.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [14, 28, 14]
      }),
    };
  }


  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Carousel
            data={[1, 2, 3]}
            renderItem={this.renderItem}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={220}
            enableSnap
            slideStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              paddingStart: 10,
              paddingTop: 0,
              justifyContent: 'center',
            }}
            useNativeDriver={false}
            activeSlideAlignment='start'
            scrollInterpolator={this._scrollInterpolator}
          />
        </SafeAreaView>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  }
});

export default App;
