import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet } from 'react-native';
import HomeScreen from './HomeScreen';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulasikan proses autentikasi
    setIsLoading(true);
    setTimeout(() => {
      // Di sini, Anda dapat menambahkan logika autentikasi nyata
      if (email === 'zakifauzanrabb@gmail.com' && password === 'password') {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    }, 2000); // Ini hanya simulasi, biasanya Anda akan berinteraksi dengan server

  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (isLoggedIn) {
    // Jika login berhasil, navigasi ke halaman beranda
    // Anda dapat menggunakan React Navigation atau alat navigasi lainnya
    return <HomeScreen/>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:100,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default Login;
