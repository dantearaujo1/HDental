import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { query, getDocs, updateDoc, collection, where, } from "firebase/firestore"
import { firestore, storage }   from '../../config/firebase';
import * as ImagePicker from 'expo-image-picker'

  export const getMediaLibraryPermission = async(cb,uploadStateCb) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    pickImage(cb,uploadStateCb)
  }
  export const getCameraPermission = async(cb,uploadStateCb) => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false){
      alert("Permission to access camera roll is required!");
      return;
    }
    pickCameraImage(cb,uploadStateCb)
  }

  export const pickImage = async(cb,uploadStateCb) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if(!result.cancelled){
      cb(result.uri);
      if(uploadStateCb){
        uploadStateCb(true);
      }
    }
  }
  export const pickCameraImage = async(cb,uploadStateCb) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if(!result.cancelled){
      cb(result.uri);
      if(uploadStateCb){
        uploadStateCb(true);
      }
    }
  }

  export const uploadImage = async (image,whereInStorage,whereInDatabase, equalKey) => {

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
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    // Create a ref in Firebase
    const storageRef = ref(storage, whereInStorage);

    // Upload blob to Storage
    await uploadBytes(storageRef,blob).then(async (uploadResult) => {
      await getDownloadURL(uploadResult.ref).then(async (url)=> {
        const userRef = collection(firestore,whereInDatabase);
        const q = query(userRef,where(equalKey, "==", storageRef.name));
        const docID = await getDocs(q).then((snapshot)=> {
          snapshot.forEach((child)=> {
            updateDoc(child.ref,{profileImageURL:url});
          })
        })
      })
    });
  }

  export const downloadUserProfileImage = async (imageRef) => {
      return await getDownloadURL(imageRef);
  }

  export const getUserData = async (whereAtFirestore,key,test,value) => {
    try{

      const q = query(collection(firestore,whereAtFirestore), where(key,test,value));
      const docs = await getDocs(q);
      const data = docs.docs[0].data();
      return data;
    } catch (error){
      alert(error.message);
    }
  }
