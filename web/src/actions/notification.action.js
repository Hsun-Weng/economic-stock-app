import notificationConstants from '../constants/notification.constants';

export const notificationAction = {
    enqueueNotification,
    closeNotification,
    removeNotification,
    enqueueSuccess,
    enqueueError,
    enqueueWarning,
    enqueueInfo
}

function enqueueNotification(notification) {
    const key = notification.options && notification.options.key;
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

function enqueueSuccess(message) {
    return enqueueNotification({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
        }
    });
}

function enqueueError(message) {
    return enqueueNotification({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'error',
        }
    });
}

function enqueueWarning(message) {
    return enqueueNotification({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'warning',
        }
    });
}

function enqueueInfo(message) {
    return enqueueNotification({
        message: message,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
        }
    });
}