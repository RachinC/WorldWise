/* eslint-disable react/prop-types */
import { React, createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  authError: "",
};

function reducer(state, action) {
  switch(action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case 'logout':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    case 'error':
      return {
        ...state,
        authError: 'Something went wrong!!! Please try again.',
      }
    default: throw new Error("Unknown auth action");
  }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?r=mc",
  };

function AuthProvider({children}) {
  const [{ user, isAuthenticated, authError }, dispatch] = useReducer(reducer, initialState);


  function login(username, password) {
      if(username === FAKE_USER.email && password === FAKE_USER.password) {
          dispatch({type: 'login', payload: FAKE_USER});
      }
      else {
        dispatch({ type: 'error'});
      }
  }

  function logout() {
    dispatch({type: 'logout'})
  }

  return(<AuthContext.Provider value={{
    user,
    isAuthenticated,
    authError,
    login,
    logout,
  }}>{children}</AuthContext.Provider>)
}

function useAuth() {
  const context = useContext(AuthContext);

  if(context === undefined) throw new Error("AuthContext was used outside the auth provider");
  return context;
}

export { AuthProvider, useAuth };