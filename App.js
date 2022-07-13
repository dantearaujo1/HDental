import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ClinicScreen from './src/screens/ClinicScreen';
import AddClinicScreen from './src/screens/AddClinicScreen';


const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Clinics" component={ClinicScreen} options={{headerShown:true,headerStyle:{backgroundColor:"#898C8B"}}}/>
        <Stack.Screen name="AddClinic" component={AddClinicScreen} options={{headerShown:true,headerStyle:{backgroundColor:"#898C8B"}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



