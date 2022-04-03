/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { SwitchButton } from './src/SwitchButton';

const App = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  return (
    <View style={styles.wrapper}>
      <SwitchButton value={isSwitchOn} setValue={setIsSwitchOn}/>
      {/* <SwitchButton/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App;
