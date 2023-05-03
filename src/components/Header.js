import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function Header() {
  function Headerr() {
    return (
      <View
        style={{
          width: '100%',
          height: '9%',
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 22, fontWeight: '700'}}>
          Tasks
        </Text>
      </View>
    );
  }
  return <Headerr />;
}
