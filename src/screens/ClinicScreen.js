import React, {useState, useEffect} from 'react';
import { TouchableOpacity,
  StyleSheet, ActivityIndicator,
  Text, FlatList, Image,
  View,
} from 'react-native';

import firebaseApp, {firestore , storage}  from '../../config/firebase'
import { query, getDocs, updateDoc, collection, where, addDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes} from "firebase/storage"
import * as ImagePicker from 'expo-image-picker'

export default function ClinicScreen({navigation,route}){
  const [Data,setData] = useState([]);
  const [update,setUpdate] = useState(true);

  useEffect(() => {
    if(update){
      getClinicData();
    }
  },[update]);

  useEffect(() => {
    setUpdate(true);
  },[route]);

  const getClinicData = () => {
    const q = query(collection(firestore,"clinics"), where("creator","==",firebaseApp.auth().currentUser.uid));
    getDocs(q).then((docs) => {
      docs.forEach((doc)=> { {
        Data.push(doc.data());
      } });
      setUpdate(false);
      });
  }

  return(
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={Data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.clinicsButtonsContainer}>
            <TouchableOpacity
              onPress={()=> { navigation.navigate('ClinicDetail',{clinicID:item.id}) }}
              style={styles.clinicsButtons}>
              <Image
                style={styles.clinicImage}
                source={item.profileImageURL?{uri:item.profileImageURL}:require('../../assets/user_image.png')}></Image>
              <Text style={styles.clinicsButtonsText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}>
      </FlatList>
      <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity  onPress={()=> { navigation.navigate('AddClinic'); }}><Text style={styles.bottomButtons}>Add</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.bottomButtons}>Delete</Text></TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#5C0726',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
    flatListContainer:{
    },
    clinicsButtonsContainer:{
      backgroundColor: '#000',
      width:"100%",
    },
    clinicsButtons:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      width: "100%",
      height: 120,
      borderColor:'#919151',
      borderWidth: 2,
      borderRadius: 5,
      backgroundColor: '#400036',
    },
    clinicImage:{
      position:'relative',
      left:15,
      width:80,
      height:80,
    },
    clinicsButtonsText:{
      position:'absolute',
      left: 105,
      textAlign:'left',
      color:'#FFF',
    },
    bottomButtonsContainer:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center',
      height: "8%",
      width: "100%",
      backgroundColor: '#898C8B'
    },
    bottomButtons:{
      paddingHorizontal: "25%",
      paddingVertical: "5%",
    },
  }
)
