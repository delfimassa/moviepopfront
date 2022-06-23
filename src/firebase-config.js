import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  query,
  collection,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBbedBBLIULELSvOo05nkdpJ97k38Pcav0",
  authDomain: "pfhenry14-ba9e7.firebaseapp.com",
  projectId: "pfhenry14-ba9e7",
  storageBucket: "pfhenry14-ba9e7.appspot.com",
  messagingSenderId: "252807859140",
  appId: "1:252807859140:web:9b481e4fb946ae709cb291",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    })
    .catch((error) => {
      console.log(error);
    });
};

//FIRESTORE
export const firestore = getFirestore(app);

export const createUserDocument = async (user, name) => {
  if (!user) return;

  await setDoc(doc(firestore, "users", `${user.user.uid}`), {
    name: name,
    email: user.user.email,
    rol: "user",
    country: "ARG",
  });
};

export const getUsersId = async () => {

  const q = query(collection(firestore, "users"));
  const querySnapshot = await getDocs(q);
  const usersId = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    usersId.push(doc.id)
    // console.log(doc, " => ", doc.data());
  });
//   console.log(usersId)
  return usersId;
};


