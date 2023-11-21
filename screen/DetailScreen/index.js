import React from 'react';
import { useRoute } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';

function DetailScreen({navigation}) {
  const route = useRoute();
  const { param } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detail Screen!</Text>
      <Text>Param1: {param}</Text>
      <Button small primary onPress={() => navigation.navigate('Booking', {param: 'Booking Hotel'})}>
        <Text>Book Hotel (Param Text)</Text>
      </Button>
    </View>
  );
}

export default DetailScreen;
