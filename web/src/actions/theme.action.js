import themeConstants from '../constants/theme.constants';

export const themeAction = {
    setDarkMode
}
function setDarkMode(darkMode) {
    return dispatch => {
        dispatch(updateDarkMode(darkMode))
    };

    function updateDarkMode(darkMode) { return { type: themeConstants.SET_DARK_MODE, darkMode } }
}