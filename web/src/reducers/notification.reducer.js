import notificationConstants from '../constants/notification.constants';

const initialState = {
    notifications: []
}

export const notification = (state=initialState, action) => {
    switch (action.type) {
        case notificationConstants.NOTIFICATION_ENQUEUE:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    {
                        key: action.key,
                        ...action.notification,
                    },
                ],
            };
        case notificationConstants.NOTIFICATION_CLOSE:
            return {
                ...state,
                notifications: state.notifications.map(notification => (
                    (action.dismissAll || notification.key === action.key)
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )),
            };
        case notificationConstants.NOTIFICATION_REMOVE:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.key !== action.key,
                ),
            };
        default:
            return state;
    }
}