import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useSnackbar } from 'notistack';
import { notificationActions } from '../actions';

let displayed = [];

const Notification = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notification.notifications || []);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                // dismiss snackbar using notistack
                closeSnackbar(key);
                return;
            }

            // do nothing if snackbar is already displayed
            if (displayed.includes(key)) return;

            // display snackbar using notistack
            enqueueSnackbar(message, {
                key,
                ...options,
                action: key => (
                    <IconButton onClick={() => closeSnackbar(key)} color="inherit">
                        <ClearIcon />
                    </IconButton>
                ),
                anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                onExited: (event, myKey) => {
                    // removen this snackbar from redux store
                    dispatch(notificationActions.removeNotification(myKey));
                    removeDisplayed(myKey);
                },
            });

            // keep track of snackbars that we've displayed
            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);

    return null;
};

export default Notification;