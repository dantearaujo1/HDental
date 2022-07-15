import React, {useState} from 'react';
import firebaseApp, {firestore , storage}  from '../../config/firebase'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Image, } from 'react-native';
import { query, getDocs, updateDoc, collection, where, addDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes} from "firebase/storage"
import PhoneInput from 'react-native-phone-input'
import * as ImagePicker from 'expo-image-picker'

const auth = firebaseApp.auth();

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [userID, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cro, setCRO] = useState('');
  const [profileImage, setProfileImage] = useState(null);

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
    const storageRef = ref(storage, 'avatars/'+id);

    // Upload blob to Storage
    uploadBytes(storageRef,blob).then((uploadResult) => {
      getDownloadURL(uploadResult.ref).then(async (url)=> {
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
  const getUserPermission = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    pickImage();
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

  const createUser = async () => {
    try {
      if (email !== '' && password !== '' && userName !== '' && cro !== '' && address !== ''){
        const res = await auth.createUserWithEmailAndPassword(email,password);
        const user = res.user;
        setUserId(user.uid);
        const q = query(collection(firestore,"users"), where("uid","==",user.uid));
        getDocs(q).then((docs)=> { 
          if(docs.docs.length === 0){
            addDoc(collection(firestore,"users"),{
              uid: user.uid,
              name: userName,
              authProvider: "local",
              email: user.email,
              CRO: cro,
              address: address,
              profileImageURL: profileImage,
              phoneNumber: phone
            });
          }
          uploadImage(user.uid).then(()=> {
            navigation.navigate('Home',{userID: user.uid});
          });
        });
      }
    } catch (error){
      alert(error.message);
    }
  };
  const handlePhoneNumber = (number) => {
    setPhone(number);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign Up</Text>

      <TouchableOpacity onPress={getUserPermission}><Image source={profileImage?{uri:profileImage}:require('../../assets/user_image.png')} style={styles.logoImage}></Image></TouchableOpacity>
      <TextInput
        placeholder='Email'
        style={styles.textInput}
        value={email}
        onChangeText={text => setEmail(text)}
      ></TextInput>

      <TextInput
        placeholder='Password'
        secureTextEntry={true}
        style={styles.textInput}
        value={password}
        onChangeText={text=>setPassword(text)}
      ></TextInput>
      <TextInput
        placeholder='Name'
        style={styles.textInput}
        value={userName}
        onChangeText={text=>setUserName(text)}
      ></TextInput>
      <TextInput
        placeholder='CRO'
        style={styles.textInput}
        value={cro}
        onChangeText={text=>setCRO(text)}
      ></TextInput>
      <TextInput
        placeholder='Address'
        style={styles.textInput}
        value={address}
        onChangeText={text=>setAddress(text)}
      ></TextInput>
      <PhoneInput initialCountry='Brazil' onChangePhoneNumber={handlePhoneNumber} offset={30} textProps={{ placeholder:'Phone Number' }} style={styles.textInput}/>


      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity onPress={createUser} style={styles.loginButtons} >
          <Text style={{textAlign:'center'}}>Ok</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButtons}>
          <Text style={{textAlign:'center'}} onPress={()=> { navigation.navigate('Login'); }}>Back</Text>
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
    height:200,
    width:200,
    borderRadius: 1000,
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
