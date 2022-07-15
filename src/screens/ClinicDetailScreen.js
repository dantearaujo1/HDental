import React, {useState, useEffect} from 'react';
import { 
  StyleSheet,
  Text,Image,
  View,
} from 'react-native';

import {firestore}  from '../../config/firebase'
import { query, getDocs, collection, where, addDoc } from "firebase/firestore"

import { getDownloadURL, ref, uploadBytes} from "firebase/storage"
import * as ImagePicker from 'expo-image-picker'

export default function ClinicDetailScreen({navigation,route}){
  const [clinic,setClinic] = useState(null);
  const [name,setName] = useState('');
  const [address,setAddress] = useState('');
  const [owner,setOwner] = useState('');
  const [profileImageURL,setProfileImageURL] = useState(null);

  useEffect(() => {
    getClinicData()
  },[]);

  const getClinicData = () => {
    const q = query(collection(firestore,"clinics"),where("id","==",route.params.clinicID));
    getDocs(q).then((docs) => {
      setClinic(docs.docs[0].data());
      setProfileImageURL(docs.docs[0].data().profileImageURL)
      setName(docs.docs[0].data().name)
      setAddress(docs.docs[0].data().address)
      setOwner(docs.docs[0].data().owner)
    });
  }



  return(
    <View style={styles.container}>
      <Text  style={styles.textClinic}>Clinic: {name}</Text>
      <Text style={styles.textOwner}>Owner: {owner}</Text>
      <Image style={styles.clinicImage} source={profileImageURL?{uri:profileImageURL}:require('../../assets/odontology-logo.png')}></Image>
      <Text style={styles.textAddress}>Address: {address}</Text>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#5C0726',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    textClinic:{
      color:'#fff',
      fontSize: 30,
      marginTop: 50,
    },
    textOwner:{
      color:'#fff',
      fontSize: 28,
      marginTop: 50,
    },
    textAddress:{
      color:'#80AA00',
      fontSize: 18,
      marginTop: 50,
    },
    clinicImage:{
      width:"60%",
      height:"30%",
      marginTop: 30,
    },
  }
)
