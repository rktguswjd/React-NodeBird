export const initialState = {
  isLoggingIn: false, // 로그인 시도 중
  isLoggedIn: false,
  isLoggingOut: false, // 로그아웃 시도 중
  me: null,
  signUpData: {},
  loginData: {},
};

export const loginRequestAction = (data) => {
  return {
    type: "LOG_IN_REQUEST",
    data,
  };
};

export const logoutRequestAction = (data) => {
  return {
    type: "LOG_OUT_REQUEST",
    data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_IN_REQUEST":
      console.log("reducer login");
      return {
        ...state,
        isLoggingIn: true,
      };

    case "LOG_IN_SUCCESS":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        me: { ...action.data, nickname: "rktguswjd" },
      };

    case "LOG_IN_FAILURE":
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
      };

    case "LOG_OUT_REQUEST":
      return {
        ...state,
        isLogginOut: true,
      };

    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLogginOut: false,
        isLoggedIn: false,
        me: null,
      };

    case "LOG_OUT_FAILURE":
      return {
        ...state,
        isLogginOut: false,
      };

    default:
      return state;
  }
};

export default reducer;
