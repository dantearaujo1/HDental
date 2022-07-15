import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import app, {firestore,storage}   from '../../config/firebase';
import {
    getDownloadURL,
  getStorage,
  ref,
  uploadBytes
} from "firebase/storage"
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
  query,
  getDocs,
  doc,
  updateDoc,
  collection,
  where,
} from "firebase/firestore"
import * as ImagePicker from 'expo-image-picker'

export default function HomeScreen({navigation,route}) {
  const [name, setName] = useState('')
  const [CRO, setCRO] = useState('')
  const [profileImage, setProfileImage] = useState(null);

  const auth = app.auth();

  useEffect(()=> {
      getUserData();
  }, [name,CRO]);

  useEffect(()=> {
    if(profileImage){
      uploadImage();
    }
  }, [profileImage]);



  const onSignOut = () => {
    navigation.goBack();
    auth.signOut();
  }

  const getUserPermission = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    pickImage()
  }
  const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if(!result.cancelled){
      setProfileImage(result.uri);
    }
  }

  const getUserData = () => {
    try{

      const q = query(collection(firestore,"users"), where ("uid", "==",route.params.userID));
      getDocs(q).then((docs)=> { 
        const data = docs.docs[0].data();
        setName(data.name);
        setCRO(data.CRO);
        setProfileImage(data.profileImageURL);

      })

    } catch (error){
      alert(error.message);
    }
  }

  const downloadUserProfileImage = async (imageRef) => {
    await getDownloadURL(imageRef).then((url)=> {
      setProfileImage(url);
    })
  }

  const uploadImage = async () => {

    // Implement a new Blob promise with XMLHTTPRequest
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", profileImage, true);
      xhr.send(null);
    });

    // Create a ref in Firebase
    const storageRef = ref(storage, 'avatars/'+route.params.userID);

    // Upload blob to Storage
    await uploadBytes(storageRef,blob).then(async (uploadResult) => {
      await getDownloadURL(uploadResult.ref).then(async (url)=> {
        const userRef = collection(firestore,'users');
        const q = query(userRef,where("uid", "==", storageRef.name));
        const docID = await getDocs(q).then((snapshot)=> {
          snapshot.forEach((child)=> {
            updateDoc(child.ref,{profileImageURL:url});
          })
        })
      })
    });
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={() => {
        {getUserPermission();}
      }}><Image source={profileImage?{uri:profileImage}:require('../../assets/user_image.png')} style={styles.logoImage}></Image></TouchableOpacity>

      <Text style={styles.title}>{name}</Text>
      <Text style={styles.cro}>CRO: {CRO} </Text>
      <TouchableOpacity onPress={() => {
        { navigation.navigate('Clinics'); }
      }} style={styles.buttons}><Text style={styles.buttonsText}>Meus Consultórios</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => {
        { navigation.navigate('AllClinics'); }
      }} style={styles.buttons}><Text style={styles.buttonsText}>Consultórios</Text></TouchableOpacity>
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
