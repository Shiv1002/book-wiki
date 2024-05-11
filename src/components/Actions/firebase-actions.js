import { auth, db } from "../firebase";
import {
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  arrayRemove,
  setDoc,
} from "firebase/firestore";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const LoginWithFirebase = (email, password) => {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("userCred.user.uid");
        resolve({ email: userCred.user.email });
        //set user
      })
      .catch((err) => {
        console.log(err.message);
        switch (err.code) {
          case "auth/invalid-email":
            reject("Invalid Email");
            break;
          case "auth/user-disabled":
            console.log("Permission blocked");
            reject("Permission blocked");
            break;
          case "auth/user-not-found":
            reject("No account found");
            break;
          case "auth/wrong-password":
            reject("Wrong password");
            break;
          default:
            reject("Somthing went wrong!");
        }
      });
  });
};

export const SignupWithFirebase = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        console.log("creating user", userCred.user.uid);
        //setUser

        resolve({ email: userCred.user.email });
      })
      .catch((err) => {
        console.log(err.code);
        reject("Email already in Use");
      });
  });
};

export const ReadUserData = async (email) => {
  return new Promise(async (resolve, reject) => {
    // const querySnapshot = await getDocs(collection(db, "User"));

    // create a new document in User collection
    // db(collection(db,"User")) refers to collec
    // setDoc func to set a new doc, otherwise overwrite
    // await setDoc(doc(collection(db, "User"), email), {
    //   favBooks: ["xyas"],
    // });
    try {
      const userDoc = await getDoc(doc(db, "User", email));

      // console.log(userDoc.id, userDoc.data() );

      // querySnapshot.forEach((doc) => {
      //   console.log(`${doc.id} => `, doc.data());
      //   if (doc.id == email) {
      //   }
      // });
      resolve(userDoc.data());
    } catch (e) {
      reject(e);
    }
  });
};

// > add to favriote book
export const AddUserDataFavBooks = (email, Booklink) => {
  console.log(email, Booklink);
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(
        doc(db, "User", email),
        {
          favBooks: arrayUnion(Booklink),
        },
        { merge: true }
      );

      resolve({
        status: "success",
        message: "Data updated successfully!!",
      });
    } catch (e) {
      reject({
        status: "failure",
        message: e,
      });
    }
  });
};

// > remove from faviroteBooks

export const RemoveUserDataFavBooks = (email, Booklink) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(
        doc(db, "User", email),
        {
          favBooks: arrayRemove(Booklink),
        },
        { merge: true }
      );

      resolve({
        status: "success",
        message: "Data updated successfully!!",
      });
    } catch (e) {
      reject({
        status: "failure",
        message: e,
      });
    }
  });
};

export const CreateUserData = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      await setDoc(
        doc(db, "User", email),
        {
          favBooks: [],
        },
        {
          merge: true,
        }
      );

      resolve({
        status: "success",
        message: "User Account created",
      });
    } catch (e) {
      reject({
        status: "failure",
        message: e,
      });
    }
  });
};
