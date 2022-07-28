import React, {useState, useEffect} from 'react';
import { TouchableOpacity,
  StyleSheet,
  Text, FlatList, Image,
  View,
} from 'react-native';


export default function ProcedureScreen({navigation,route}){
  const [Data,setData] = useState([]);
  const [update,setUpdate] = useState(true);

  return(
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={Data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.clinicsButtonsContainer}>
            <TouchableOpacity
              onPress={()=> {}}
              style={styles.clinicsButtons}>
              <Image
                style={styles.clinicImage}
                source={item.profileImageURL?{uri:item.profileImageURL}:require('../../assets/user_image.png')}>

              </Image>
              <Text style={styles.clinicsButtonsText}>{item.name}</Text>
            </TouchableOpacity>
          </View>
        )}>
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      backgroundColor: '#5C0726',
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
