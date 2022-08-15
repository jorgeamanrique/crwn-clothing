import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXb0fcjad5nIiWsQOmlb_-J7HePVNnw3w",
    authDomain: "crwn-clothing-db-54096.firebaseapp.com",
    projectId: "crwn-clothing-db-54096",
    storageBucket: "crwn-clothing-db-54096.appspot.com",
    messagingSenderId: "577495591782",
    appId: "1:577495591782:web:8b91bb8bc85cde35af36a7"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); 

export const db = getFirestore();

export const createUsertDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()){
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try{
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    }catch(error){
      console.log('error create the user', error.message);
    }
  }

  return userDocRef;
}