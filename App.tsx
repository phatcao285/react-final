import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './navigation/tabs';
import { BookDetail } from './screens';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import SearchBooks from './screens/SearchBooks';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  BookDetail: undefined;
  SearchBooks: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


// 2124802010151 - Lê Sỹ Hoài
// 2124802010172 - Cao Thành Phát
// 2124802010807 - Nguyễn Đức Thắng

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="BookDetail" component={BookDetail} />
        <Stack.Screen name="SearchBooks" component={SearchBooks} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
