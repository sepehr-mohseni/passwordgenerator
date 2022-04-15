import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import AXIOS from "../../utils/handlers/http";
// import lang from "../../public/assets/json/language.json"
const initialState = {
    validatePhoneBtnLoading: false,
    validatePhoneError: '',
    validatePhoneErrorMessage: '',
    validatePhoneMessage: '',
    validatePhoneSuccess: false,
    validatePhoneData: {},
    checkLoginMode: false,
    validateOTPBtnLoading: false,
    validateOTPError: '',
    validateOTPErrorMessage: '',
    validateOTPMessage: '',
    validateOTPSuccess: false,
    validateOTPData: {},
    registerBtnLoading: false,
    registerError: '',
    registerErrorMessage: '',
    registerMessage: '',
    registerSuccess: false,
    registerData: {},
    userAuthInfo: {},
    username: "",
    password: "",
    userFirstName: "",
    userLastName: "",
    userEmail: null,
    userRefCode: "",
    loginMode: 'validatePhone',
    userConfig: {},
    usrFullInfo: {},
}
export const validatePhone = createAsyncThunk(
    'auth/phoneVld',
    async (_, { getState }) => {
        const state = getState()
        const username = (state.auth.username)
        return await AXIOS.post(
            `/api/v2/users/login`, { username }
        )
    }
)
export const validateOTP = createAsyncThunk(
    'auth/otpVld',
    async (_, { getState }) => {
        const state = getState()
        const code = (state.auth.password)
        const userId = (state.auth.validatePhoneData.uid)
        return await AXIOS.post(
            `/api/v2/users/${userId}/verify`, { code }
        )
    }
)
export const registerUser = createAsyncThunk(
    'auth/register',
    async (_, { getState, dispatch }) => {
        const state = getState()
        const mobile = (state.auth.username)
        const firstname = (state.auth.userFirstName)
        const lastname = (state.auth.userLastName)
        const email = (state.auth.userEmail)
        const refcode = (state.auth.userRefCode)
        return await AXIOS.post(
            `/api/v2/users`, { mobile, firstname, lastname, email, refcode }
        ).then(res => {
            if (res.data.success === true) {
                dispatch(validatePhone())
                dispatch(loginModeAction('otpVerify'))
            }
            return res
        })
    }
)
export const getUserConfig = createAsyncThunk(
    'auth/usrConf',
    async (_, { getState }) => {
        const state = getState()
        const id = state.auth.userAuthInfo.id
        return await AXIOS.get(
            `/api/v2/users/${id}/config`
        )
    }
)
export const getUserInfo = createAsyncThunk(
    'auth/getMe',
    async () => {
        return await AXIOS.get(
            `/api/v3/users/me`
        )
    }
)
const generator = createSlice({
    name: 'generator',
    initialState: initialState,
    reducers: {
        getNotificationPermission: (state, action) => {
            Notification.requestPermission(function (permission) {
                if (permission === 'granted') {
                    console.log('notification permission granted');
                } else if (permission === 'denied') {
                    alert(lang.BASIC.NOTIFICATION_ALERT);
                }
            });
        },
        setAuthDataToEmpty: (state) => {
            state.checkLoginMode = false
            state.validatePhoneData = {}
        },
        loginModeAction: (state, action) => {
            state.loginMode = action.payload;
        },
        typeUsername: (state, action) => {
            state.username = action.payload;
        },
        typePassword: (state, action) => {
            state.password = action.payload;
        },
        typeFirstName: (state, action) => {
            state.userFirstName = action.payload;
        },
        typeLastName: (state, action) => {
            state.userLastName = action.payload;
        },
        typeEmail: (state, action) => {
            state.userEmail = action.payload;
        },
        typeRefCode: (state, action) => {
            state.userRefCode = action.payload;
        },
    },
    extraReducers: {
        [validatePhone.pending]: (state, action) => {
            state.validatePhoneBtnLoading = true
        },
        [validatePhone.fulfilled]: (state, { payload }) => {
            state.validatePhoneError = payload.data.error
            state.validatePhoneErrorMessage = payload.data.error_message
            state.validatePhoneBtnLoading = false
            state.validatePhoneMessage = payload.data.message
            state.validatePhoneSuccess = payload.data.success
            state.validatePhoneData = payload.data.data
            state.checkLoginMode = true
        },
        [validatePhone.rejected]: (state, { error }) => {
            state.validatePhoneBtnLoading = false
        },
        [validateOTP.pending]: (state, action) => {
            state.validateOTPBtnLoading = true
        },
        [validateOTP.fulfilled]: (state, { payload }) => {
            state.validateOTPError = payload.data.error
            state.validateOTPErrorMessage = payload.data.error_message
            state.validateOTPBtnLoading = false
            state.validateOTPMessage = payload.data.message
            state.validateOTPSuccess = payload.data.success
            state.validateOTPData = payload.data.data
            if (payload.data.success === true) {
                state.userAuthInfo = payload.data.data.user
                window.location.replace("/")
                localStorage.setItem('SN_TOKEN', JSON.stringify(payload.data.data.token))
            }
        },
        [validateOTP.rejected]: (state, { error }) => {
            state.validateOTPBtnLoading = false
        },
        [registerUser.pending]: (state) => {
            state.registerBtnLoading = true
        },
        [registerUser.fulfilled]: (state, { payload }) => {
            state.registerError = payload.data.error
            state.registerMessage = payload.data.message
            state.registerErrorMessage = payload.data.error_message
            state.registerData = payload.data.data
            state.registerBtnLoading = false
            state.registerSuccess = payload.data.success
        },
        [registerUser.rejected]: (state, { error }) => {
            state.registerBtnLoading = false
        },
        [getUserConfig.fulfilled]: (state, { payload }) => {
            state.userConfig = payload?.data?.data
        },
        [getUserInfo.fulfilled]: (state, { payload }) => {
            state.usrFullInfo = payload?.data?.data
        },
    },
})

export const {
    setAuthDataToEmpty,
    typeUsername,
    typePassword,
    typeFirstName,
    typeLastName,
    typeEmail,
    typeRefCode,
    loginModeAction,
    getNotificationPermission,
} = generator.actions

export default generator.reducer
