import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // if user will signup then this will be executed
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate('/browse');
      } else {
        //if user signOut then this will be executed
        dispatch(removeUser());
        navigate('/');
      }
    });

    // unsubscribe when component unmounts.
    return () => unsubscribe();

  }, []);

  return (
    <div className="absolute w-screen px-4 md:px-8 py-2 md:py-4 bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-32 md:w-44"
        src={LOGO}
        alt="netflix-logo"
      />
      {user && (
        <div className="flex p-2">
          <img
            className="h-8 m-4"
            alt="usericon"
            // src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            src={user.photoURL}
          />
          <button className="font-bold text-white p-2" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
