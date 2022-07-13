import React, {useState, useEffect} from 'react';
import firebaseApp, {firestore as db}  from '../../config/firebase'
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Image, } from 'react-native';
import { query, getDocs, collection, where, addDoc } from "firebase/firestore"
import { getUserLibraryPermission} from "../utils/Permissions"
import {uploadImage} from "../utils/Utils"

const auth = firebaseApp.auth();

export default function SignUpScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [userID, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [cro, setCRO] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect( () => {
    if(profileImage){
      uploadImage(userID);
    }
  }, [profileImage]);

  const createUser = async () => {
    try {
      if (email !== '' && password !== '' && userName !== '' && cro !== '' && address !== ''){
        const res = await auth.createUserWithEmailAndPassword(email,password);
        const user = res.user;
        setUserId(user.uid);
        const q = query(collection(db,"users"), where("uid","==",user.uid));
        const docs = await getDocs(q);
        if(docs.docs.length === 0){
          await addDoc(collection(db,"users"),{
            uid: user.uid,
            name: userName,
            authProvider: "local",
            email: user.email,
            CRO: cro,
            address: address,
            profileImageUrl: profileImage
          });
        }
        navigation.navigate('Home');
      }
    } catch (error){
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Sign Up</Text>

      <TouchableOpacity onPress={() => {
        getUserLibraryPermission(setProfileImage);
      }}><Image source={profileImage?{uri:profileImage}:require('../../assets/user_image.png')} style={styles.logoImage}></Image></TouchableOpacity>
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


      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity onPress={createUser} style={styles.loginButtons} >
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
