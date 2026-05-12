// /**
//  * @format
//  */
// import 'react-native-gesture-handler';
// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Geolocation from '@react-native-community/geolocation';

// ✅ REQUIRED for Android live location
Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'whenInUse',
});

AppRegistry.registerComponent(appName, () => App);
