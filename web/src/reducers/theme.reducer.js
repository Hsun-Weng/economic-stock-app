import themeConstants from '../constants/theme.constants';

const initState = {
    darkMode: false
}

export const theme = (state=initState, action) => {
    switch(action.type) {
        case themeConstants.SET_DARK_MODE:
            return {
                darkMode: action.darkMode
            };
        default:
            return state;
    }
}
