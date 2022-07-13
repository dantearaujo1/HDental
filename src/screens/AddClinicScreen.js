import React, {useState, useEffect} from 'react';
import firebaseApp, {firestoreDatabase as db}  from '../../config/firebase'
import { TouchableOpacity, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import { query, getDocs, collection, where, addDoc, } from "firebase/firestore"
import {getCameraPermission, pickMediaImage, getUserLibraryPermission} from '../utils/Permissions'

const auth = firebaseApp.auth();

export default function AddClinicScreen({navigation}) {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);


  return (
    <View style={styles.container}>

      <Text style={styles.title}>Add Clinic</Text>
      <TouchableOpacity onPress={() => {
        // getUserLibraryPermission(setImage);
      }}><Image source={image?{uri:image}:require('../../assets/odontology-logo.png')} style={styles.logoImage}></Image></TouchableOpacity>


      <TextInput
        placeholder='Name'
        style={styles.textInput}
        value={name}
        onChangeText={text => setName(text)}
      ></TextInput>

      <TextInput
        placeholder='Owner'
        secureTextEntry={true}
        style={styles.textInput}
        value={owner}
        onChangeText={text=>setOwner(text)}
      ></TextInput>
      <TextInput
        placeholder='Address'
        style={styles.textInput}
        value={address}
        onChangeText={text=>setAddress(text)}
      ></TextInput>


      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity  style={styles.loginButtons} >
          <Text style={{textAlign:'center'}}>Ok</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtons}>
          <Text style={{textAlign:'center'}}>Back</Text>
        </TouchableOpacity>
      </View>
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
  logoImage:{
    height:300,
    width:300,
    marginBottom:25,
  },
  title:{
    color: '#AACC11',
    fontSize: 46,
    marginBottom:25,
  },
  textInput:{
    color : "#000",
    backgroundColor: '#fff',
    width: 200,
    height: 30,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
    borderRadius: 10,
  },
  loginButtons:{
    margin:20,
    width: 100,
    height: 40,
    justifyContent:'center',
    backgroundColor : "#22CCFF",
    borderRadius:10,
  },
});
