import { TouchableOpacity,
  StyleSheet, ActivityIndicator,
  Text, FlatList, Image,
  View,
} from 'react-native';


function Clinics(){
  const [loading, setLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
}
export default function ClinicScreen({navigation,route}){
  const Data = [
    {id:1, nome: "Clinica Sorria Mais"},
    {id:2, nome: "Clinica Companhia do Sorriso"},
    {id:3, nome: "Clinica HDental"},
    {id:4, nome: "Clinica Sorriso"},
    {id:5, nome: "Clinica Dental"},
    {id:6, nome: "Clinica Centro do Sorriso"},
  ]

  return(
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={ Data }
        renderItem={({item}) => (
          <View style={styles.clinicsButtonsContainer}>
            <TouchableOpacity style={styles.clinicsButtons}>
              <Image style={styles.clinicImage} source={require('../../assets/user_image.png')}></Image>
              <Text style={styles.clinicsButtonsText}>{item.nome}</Text>
            </TouchableOpacity>
          </View>
        )}>
      </FlatList>
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity onPress={()=> { navigation.navigate('AddClinic'); }}><Text>Add</Text></TouchableOpacity>
        <TouchableOpacity><Text>Delete</Text></TouchableOpacity>
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
      position:'absolute',
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
  }
)
