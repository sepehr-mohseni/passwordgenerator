import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    passLen: 8,
    passCharsUpper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    passCharsLower: "abcdefghijklmnopqrstuvwxyz",
    passCharsNumbers: "1234567890",
    passCharsSpecial: "!@#$%^&*()_+-=[]{}|;':,./<>?",
    shouldHaveDigits: true,
    shouldHaveSpecialChars: true,
    shouldHaveLetters: true,
    password: ""
}
const generator = createSlice({
    name: 'generator',
    initialState: initialState,
    reducers: {
        setPassLen: (state, action) => {
            state.passLen = action.payload;
        },
        digitsHave: (state, action) => {
            state.shouldHaveDigits = action.payload;
        },
        specialCharsHave: (state, action) => {
            state.shouldHaveSpecialChars = action.payload;
        },
        lettersHave: (state, action) => {
            state.shouldHaveLetters = action.payload;
        },
        copyToClipboard: (state, action) => {
           navigator.clipboard.writeText(state.password); 
        },
        passwordGenerator: (state, action) => {
            const passLen = state.passLen;
            const passCharsUpper = state.passCharsUpper;
            const passCharsLower = state.passCharsLower;
            const passCharsNumbers = state.passCharsNumbers;
            const passCharsSpecial = state.passCharsSpecial;
            const shouldHaveDigits = state.shouldHaveDigits;
            const shouldHaveSpecialChars = state.shouldHaveSpecialChars;
            const shouldHaveLetters = state.shouldHaveLetters;
                let password = "";
                let passChars = "";
                if (shouldHaveLetters) {
                    passChars += passCharsUpper;
                    passChars += passCharsLower;
                }
                if (shouldHaveDigits) {
                    passChars += passCharsNumbers;
                }
                if (shouldHaveSpecialChars) {
                    passChars += passCharsSpecial;
                }
                for (let i = 0; i < passLen; i++) {
                    password += passChars.charAt(Math.floor(Math.random() * passChars.length));
                }
                state.password = password;
        }
    },
})
export const {
    setPassLen,
    similarCharsHave,
    digitsHave,
    specialCharsHave,
    lettersHave,
    copyToClipboard,
    passwordGenerator,
} = generator.actions
export default generator.reducer