export const initState = {
  books: [],
  user: {
    email: null,
    profileImg: null,
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
      };
      return {
        ...state,
        user: newUser,
      };

    default:
      console.log("invalid type");
  }
};
