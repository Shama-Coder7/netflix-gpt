import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate('/error');
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

  const handleGPTSearchClick = () => {
    //Toggle GPT Search Page
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="max-w-full absolute w-screen px-4 md:px-8 py-2 md:py-4 bg-gradient-to-b z-10 flex justify-between">
      <img className="w-32 md:w-44" src={LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex p-2">
          {showGptSearch && (
            <select
              className="py-1 px-6 m-2 my-3 rounded-lg bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-1 px-6 m-2 my-3 rounded-lg bg-purple-800 text-white"
            onClick={handleGPTSearchClick}
          >
            {showGptSearch ? 'HomePage' : 'GPTSearch'}
          </button>
          <img
            className="h-8 m-4"
            alt="usericon"
            // src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            src={user.photoURL}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          {isDropdownOpen && (
            <div className="absolute top-20 right-5 bg-red-700 border rounded p-1">
              <button
                className="font-bold text-white p-1"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
              {/* Add other dropdown options here */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
