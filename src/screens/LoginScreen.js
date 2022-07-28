import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import firebaseApp from '../../config/firebase'

const auth = firebaseApp.auth();

export default function LoginScreen({route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    try {
      if (email !== '' && password !== '') {
        const res = await auth.signInWithEmailAndPassword(email, password);
        // route.params.userData = res.user;
        navigation.navigate('Home', {userID: res.user.uid});
      }
    } catch (error) {
      // setLoginError(error.message);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={require('../../assets/odontology-logo.png')} style={styles.logoImage}></Image>
      </View>
      <Text style={styles.title}>HDental</Text>

      <TextInput
        placeholder='Username'
        autoCapitalize = 'none'
        style={styles.textInput}
        value={email}
        onChangeText={text => setEmail(text)}
        leftIcon={<Icon name='envelope' size={16} />}
      ></TextInput>

      <TextInput
        placeholder='Password'
        autoCapitalize = 'none'
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={text => setPassword(text)}
        leftIcon={<Icon name='key' size={16} />}
      ></TextInput>

      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity style={styles.loginButtons} onPress={onLogin}>
          <Text style={{ textAlign: 'center' }}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtons} onPress={() => { navigation.navigate('SignUp'); }}>
          <Text style={{ textAlign: 'center' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5C0726',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer:{
    marginBottom: 25,
  },
  logoImage: {
    height: 300,
    width: 200,
  },
  title: {
    color: '#AACC11',
    fontSize: 46,
    marginBottom: 25,
  },
  textInput: {
    color: "#000",
    backgroundColor: '#fff',
    width: 200,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
  },
  loginButtons: {
    margin: 20,
    width: 100,
    height: 40,
    justifyContent: 'center',
    backgroundColor: "#22CCFF",
    borderRadius: 10,
  },
});
