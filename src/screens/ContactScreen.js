
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact </Text>
      <Text style={styles.Contacttext}> Address: 500 W Road to Six Flags St, Arlington, TX 76011 </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2B5329',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  Contacttext: {
    fontSize: 18,
    color: '#ffffff',
    marginTop: 5,
  },

});

export default ContactScreen;
