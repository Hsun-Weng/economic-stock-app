import notificationConstants from '../constants/notification.constants';

export const notificationActions = {
    enqueueNotification,
    closeNotification,
    removeNotification
}

function enqueueNotification(notification) {
    const key = notification.options && notification.options.key;
    console.log(notification)
    return {
        type: notificationConstants.NOTIFICATION_ENQUEUE,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
}

function closeNotification(key) {
    return {
        type: notificationConstants.NOTIFICATION_CLOSE,
        dismiessAll: !key,
        key
    }
}

function removeNotification(key) {
    return {
        type: notificationConstants.NOTIFICATION_REMOVE,
        key,
    }
}