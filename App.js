import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import PrayerTimesScreen from './src/screens/PrayerTimesScreen';
import AnnouncementsScreen from './src/screens/AnnouncementsScreen';
import EventsScreen from './src/screens/EventsScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Prayer Times" component={PrayerTimesScreen} />
          <Tab.Screen name="Announcements" component={AnnouncementsScreen} />
          <Tab.Screen name="Events" component={EventsScreen} />
          <Tab.Screen name="Contact" component={ContactScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
