import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidateData } from '../utils/validate';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { NETFLIX_BACKGROUND, USER_AVATAR } from '../utils/constants';
import LoginBody from './LoginBody';

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handletoggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleButtonClick = () => {
    const message = checkValidateData(
      email.current?.value,
      password.current?.value,
      name.current?.value
    );
    setErrorMessage(message);
    // console.log('main', message);

    // console.log(name.current?.value);
    // console.log(email.current?.value);
    // console.log(password.current?.value);

    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value,
        name.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // navigate('/browse');
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current?.value,
        password.current?.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
          // navigate('/browse');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute inset-0">
        <img
          className="h-screen w-full object-cover"
          src={NETFLIX_BACKGROUND}
          alt="netflix-background"
        />
      </div>
      <div className="absolute inset-20 md:inset-30 ">
        <LoginBody />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-4 md:p-6 bg-black my-64 md:my-52 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-2xl md:text-3xl py-2 md:py-2">
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 md:p-4 my-2 md:my-4 w-full bg-gray-800"
          />
        )}
        {/* <p className="text-red-500 font-bold">{nameError}</p> */}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-800"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 md:p-4 my-2 md:my-4 w-full bg-gray-800"
        />
        <p className="text-red-500 font-bold">{errorMessage}</p>
        <button
          className="p-2 md:p-3 my-4 md:my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        <p className="py-1 md:py-1 cursor-pointer" onClick={handletoggleForm}>
          {isSignIn
            ? 'New to Netflix? Sign Up Now'
            : 'Already Registered! Sign In Now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
