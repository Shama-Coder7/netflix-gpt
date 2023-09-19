import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUser: (state, action) => { // for adding user
      return action.payload;
    },
    removeUser: (state, action) => { // for sign out
      return null;
    },
  },
});


export const {addUser, removeUser} = userSlice.actions;

export default userSlice.reducer;