import React, {useState} from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import firebaseApp, {firestore,storage}  from '../../config/firebase'
import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { query, getDocs, setDoc, addDoc, updateDoc, collection, where, } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker'


export default function AddClinicScreen({navigation}) {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage,setProfileImage] = useState(null);


  const uploadImage = async (id) => {

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
    const storageRef = ref(storage, 'clinicAvatars/'+id);

    // Upload blob to Storage
    uploadBytes(storageRef,blob).then((uploadResult) => {
      getDownloadURL(uploadResult.ref).then(async (url)=> {
        const userRef = collection(firestore,'clinics');
        const q = query(userRef,where("id", "==", id));
        const snapShot = await getDocs(q);

        snapShot.forEach(async (child)=> {
          await updateDoc(child.ref,{profileImageURL:url});
        })
        })
      })
  }

  const getCameraPermission = async() => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera is required!");
      return;
    }
    pickCameraImage();
  }

  const pickCameraImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if(!result.cancelled){
      setProfileImage(result.uri);
    }
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

  const createClinic = async () => {
    try {
      if (name !== '' && owner !== '' && address !== ''){
        const docRef = await addDoc(collection(firestore,"clinics"),{
              name: name,
              owner: owner,
              address: address,
              creator: firebaseApp.auth().currentUser.uid,
            });
        await updateDoc(docRef,{id:docRef.id});
        await uploadImage(docRef.id,'clinicAvatars','clinics');
        navigation.navigate('Home');
      }
    }
    catch (error){
      alert(error.message);
    }
   }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Add Clinic</Text>
      <TouchableOpacity onPress={getCameraPermission}><Image source={profileImage?{uri:profileImage}:require('../../assets/odontology-logo.png')} style={styles.logoImage}></Image></TouchableOpacity>


      <TextInput
        placeholder='Name'
        style={styles.textInput}
        value={name}
        onChangeText={text => setName(text)}
      ></TextInput>

      <TextInput
        placeholder='Owner'
        secureTextEntry={false}
        autoCapitalize='none'
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
          <Text style={{textAlign:'center'}} onPress={createClinic}>Ok</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtons}>
          <Text style={{textAlign:'center'}} onPress={()=> { navigation.navigate('Clinics'); }}>Back</Text>
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
