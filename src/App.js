import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import "./App.css";
import firebaseConfig from "./firebase";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  const [userInfo, setUserInfo] = useState({
    isSignIn: false,
    name: "",
    email: "",
    photo: "",
  });

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signInUser = {
          isSignIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
        };
        setUserInfo(signInUser);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const SignOutUser = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        const userSignOut = {
        isSignIn: false,
        }
        setUserInfo(userSignOut)
      })
      .catch((error) => {});
  };

  return (
    <div className="container">
      <div className="authentication">
        <div className="googleSignIn">
          {userInfo.isSignIn ? (
            <button onClick={SignOutUser}>
              <FcGoogle /> Sign Out
            </button>
          ) : (
            <button onClick={handleSignIn}>
              <FcGoogle /> Google
            </button>
          )}

          <br />
          <br />
          {userInfo.isSignIn && (
            <div className="row">
              <div className="cal-md-4 m-auto">
                <Card style={{ width: "18rem" }} className="text-center">
                  <Card.Img variant="top" src={userInfo.photo} width="100px" />
                  <Card.Body>
                    <Card.Title>{userInfo.name}</Card.Title>
                    <Card.Text>{userInfo.email}</Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
