import {firestore,storage}   from '../../config/firebase';
import {
    getDownloadURL,
  ref,
  uploadBytes
} from "firebase/storage"
import {
  query,
  getDocs,
  updateDoc,
  collection,
  where,
} from "firebase/firestore"

  export const uploadImage = async (id) => {

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
