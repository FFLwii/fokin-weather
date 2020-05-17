import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "2936d859af7bbee50c55362974b3167c";

export default class App extends React.Component {
  state = {
    isLoding: true
  }
  getWeather = async (latitude, longitude) => {
    const { data: {
      main: { temp },
      weather
    }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    console.log('\n\n');
    this.setState({ isLoding: false, condition: weather[0].main, temp});
    console.log(data);
  };

  getLocation = async () => {

    try {
      await Location.requestPermissionsAsync(); //about permission
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync();//sent to API and get Weather
      this.getWeather(latitude, longitude);
      console.log(latitude, longitude);
    } catch (error) {
      Alert.alert("Cant't find you.", "So sad");
    }

  };

  componentDidMount() {
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    console.log("랜더?!" + isLoading);
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
  
  }
}