import * as ImagePicker from 'expo-image-picker'

  export const pickMediaImage = async(callbackFunction) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if(!result.cancelled){
      callbackFunction(result.uri);
    }
  }
  const pickCameraImage = async (callbackFunction) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if(!result.cancelled){
      callbackFunction(result.uri);
    }
  }
export const getUserLibraryPermission = async(callbackFunction) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    pickMediaImage(callbackFunction);
  }
export const getCameraPermission = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    pickCameraImage(callbackFunction);
  }


export const test = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    ImagePicker.showImagePicker({tite:'Select Image'}, res => {

  })
  }
