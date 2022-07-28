import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import app, {firestore,storage}   from '../../config/firebase';
import { query, getDocs, updateDoc, collection, where, } from "firebase/firestore"
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {getUserData,uploadImage,getCameraPermission,getMediaLibraryPermission} from '../utils/Utils'

export default function HomeScreen({navigation,route}) {
  const [name, setName] = useState('')
  const [CRO, setCRO] = useState('')
  const [shouldUploadImage, setShouldUploadImage] = useState(false)
  const [profileImage, setProfileImage] = useState(null);

  const auth = app.auth();

  useEffect(()=> {
    getUserData('users',"uid","==",route.params.userID).then((data)=> {
      setName(data.name);
      setCRO(data.CRO);
      setProfileImage(data.profileImageURL);
    })
  }, [name,CRO]);

  useEffect(()=> {
    if(shouldUploadImage){
      uploadImage(profileImage,'avatars/'+route.params.userID,'users','uid');
      setShouldUploadImage(false);
    }
  });

  const onSignOut = () => {
    navigation.goBack();
    auth.signOut();
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => {
        {getCameraPermission(setProfileImage,setShouldUploadImage);}
      }}><Image source={profileImage?{uri:profileImage}:require('../../assets/user_image.png')} style={styles.logoImage}></Image></TouchableOpacity>

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.cro}>CRO: {CRO} </Text>
      <TouchableOpacity onPress={() => {
        { navigation.navigate('Clinics'); }
      }} style={styles.buttons}><Text style={styles.buttonsText}>Meus Consultórios</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        { navigation.navigate('AllClinics'); }
      }} style={styles.buttons}><Text style={styles.buttonsText}>Consultórios</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        { navigation.navigate('Procedures'); }
      }} style={styles.buttons}><Text style={styles.buttonsText}>Procedimentos</Text></TouchableOpacity>
      <TouchableOpacity style={styles.buttons} onPress={onSignOut}><Text style={styles.buttonsText}>Log Out</Text></TouchableOpacity>


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
  logoImage:{
    height:200,
    width:200,
    marginBottom:25,
    borderRadius:1000,
    borderColor: '#FFBCF2',
    borderWidth: 2,
  },
  title:{
    width: 500,
    textAlign:'center',
    color: '#AACC11',
    fontSize: 46,
    marginBottom:25,
  },
  cro:{
    width: 500,
    color: '#AACC11',
    fontSize: 24,
    marginBottom:5,
    textAlign:'center',
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
  buttons:{
    margin:20,
    width: 200,
    height: 40,
    justifyContent:'center',
    textAlign: 'center',
    backgroundColor : "#FFBCF2",
    borderRadius:10,
    borderColor : "#000",
    borderWidth : 2,
  },
  buttonsText:{
    color: '#000',
    textAlign: 'center'
  }
});
