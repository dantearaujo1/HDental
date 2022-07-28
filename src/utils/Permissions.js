import * as ImagePicker from 'expo-image-picker'

  export const pickMediaImage = async() => {
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
export const getUserLibraryPermission = async() => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    pickMediaImage();
  }
export const getCameraPermission = async() => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera is required!");
      return;
    }
    pickCameraImage();
  }


