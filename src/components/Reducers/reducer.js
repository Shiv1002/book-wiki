// reset localstorage after logout
const resetLocalStorage = () => {
  localStorage.removeItem("BookWiki");
  // console.log(bookeys);
};

//set localstorage after login by user
const setLocalStorage = (user) => {
  localStorage.setItem("BookWiki", JSON.stringify(user));
};

export const initState = {
  books: [],
  user: {
    email: JSON.parse(localStorage.getItem("BookWiki"))?.email,
    profileImg: JSON.parse(localStorage.getItem("BookWiki"))?.profileImg,
    favBooks: JSON.parse(localStorage.getItem("BookWiki"))?.favBooks || [],
  },
};

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "setBooks":
      return { ...state, books: payload };
    case "setUser":
      const newUser = {
        email: payload.email,
        profileImg: payload.profileImg,
        favBooks: payload.favBooks || [],
      };
      setLocalStorage(newUser);
      return {
        ...state,
        user: newUser,
      };
    case "resetUser": {
      resetLocalStorage();

      return {
        ...state,
        user: {
          email: undefined,
          profileImg: undefined,
          favBooks: [],
        },
      };
    }
    default:
      console.log("invalid type");
  }
};
