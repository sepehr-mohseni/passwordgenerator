import { Grid, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
    passwordGenerator,
    copyToClipboard,
    setPassLen,
    similarCharsHave,
    digitsHave,
    specialCharsHave,
    lettersHave
} from '../../redux/slicers/generator'
import { useState, useEffect } from 'react'
import ActionButtons from './ActionButtons'
import PasswordStr from './PasswordStr'
import LengthSlider from './LengthSlider'
import ConditionActions from './ConditionActions';
import Footer from './Footer'
export default function HomeParent() {
    const dispatch = useDispatch()
    const [openSnackBar, setOpenSnackBar] = useState(false)
    const generator = useSelector(state => state.generator)
    const {
        password,
        passLen,
        shouldHaveDigits,
        shouldHaveSpecialChars,
        shouldHaveLetters,
    } = generator
    const openAlertHandler = () => {
        setOpenSnackBar(true)
    }
    const closeAlertHandler = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar(false)
    }
    const copyPass = () => {
        dispatch(copyToClipboard())
        openAlertHandler()
    }
    const generate = () => {
        dispatch(passwordGenerator())
    }
    const passLenChange = (e) => {
        const value = e.target.value
        dispatch(setPassLen(value))
    }
    const similarCharsHandler = (e) => {
        const checked = e.target.checked
        dispatch(similarCharsHave(checked))
    }
    const digitsHandler = (e) => {
        const checked = e.target.checked
        dispatch(digitsHave(checked))
    }
    const specialCharsHandler = (e) => {
        const checked = e.target.checked
        dispatch(specialCharsHave(checked))
    }
    const lettersHandler = (e) => {
        const checked = e.target.checked
        dispatch(lettersHave(checked))
    }
    const conditions = [
        {
            title: "Digits (0-9)",
            value: shouldHaveDigits,
            onChange: digitsHandler,
        },
        {
            title: "Special Symbols (!,@,#,...)",
            value: shouldHaveSpecialChars,
            onChange: specialCharsHandler,
        },
        {
            title: "Letters (a-z, A-Z)",
            value: shouldHaveLetters,
            onChange: lettersHandler,
        },
    ]
    const checkGenerateDisable = () => {
        if(!shouldHaveDigits && !shouldHaveSpecialChars && !shouldHaveLetters) {
            return true
        }
        return false
    }
    const actionBtns = [
        {
            icon: "Copy",
            action: copyPass,
            color: "primary",
        },
        {
            icon: "Generate",
            action: generate,
            color: "secondary",
            disabled: checkGenerateDisable()

        },
    ]
    const lengthStrength = () => {
        let color = ""
        if (passLen <= 7) {
            color = "error"
        } else if (8 <= passLen && passLen <= 20) {
            color = "warning"
        } else if (passLen > 20) {
            color = "success"
        }
        return color
    }
    useEffect(() => {
        generate()
    }, [])
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
        }}
        >
            <Grid
                container
                    justifyContent= "center"
                    flexDirection= "column"
            >
                    <PasswordStr
                        pass={password}
                        copy={copyPass}
                    />
                    <LengthSlider
                        len={passLen}
                        changeLen={passLenChange}
                        color={lengthStrength()}
                    />
                    <ConditionActions
                        conditions={conditions}
                    />
                    <ActionButtons
                        actionBtns={actionBtns}
                    />
            </Grid>
            <Footer/>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={4000}
                onClose={closeAlertHandler}
                message="Copied to Clipboard!"
            />
        </div>


    )
}
