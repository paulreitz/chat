import userActions from '../../utils/userActions';

export const setUser = (userData) => ({
    type: userActions.SET_USER,
    userData
});

export const unsetUser = () => ({
    type: userActions.UNSET_USER
});

export const setAvatar = (avatar) => ({
    type: userActions.SET_AVATAR,
    avatar
});

export const setDisplayName = (displayName) => ({
    type: userActions.SET_DISPLAY_NAME,
    displayName
});