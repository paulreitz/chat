import userActions from '../../utils/userActions';

const defaultUserData = {
    name: undefined,
    displayName: undefined,
    avatar: undefined,
    key: undefined,
    createdAt: undefined,
    token: undefined
}

export default (state = defaultUserData, action) => {
    switch(action.type) {
        case userActions.SET_USER:
            return action.userData;

        case userActions.UNSET_USER:
            return defaultUserData;

        case userActions.SET_AVATAR:
            const setAvatarData = state;
            setAvatarData.avatar = action.avatar;
            return setAvatarData;

        case userActions.SET_DISPLAY_NAME:
            const setDisplayNameData = state;
            setDisplayNameData.displayName = action.displayName;
            return setDisplayNameData;

        default: 
            return state;
    }
}