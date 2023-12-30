// CustomButton.jsx
import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const commonButtonStyle = {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
    '&:hover': {
        backgroundColor: 'white',
        borderColor: 'black',
        boxShadow: 'none',
    },
};

const continueButtonStyle = {
    ...commonButtonStyle,
    '&:hover': {
        backgroundColor: '#4E9B53',
        color: 'white',
        borderColor: '#4E9B53',
        boxShadow: 'none',
    },
};

export const CustomButton = styled(Button)(commonButtonStyle);
export const ContinueButton = styled(Button)(continueButtonStyle);
