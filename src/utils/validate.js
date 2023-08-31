export const checkValidateData = (email, password, name) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isNameValid = /^[A-Za-z][A-Za-z0-9_]{4,29}$/.test(name);

  if (!isEmailValid) return 'Email Id is not valid';
  if (!isPasswordValid) return 'Password is not valid';
  if (!isNameValid) return 'Name is not Valid';
  return null;
};
