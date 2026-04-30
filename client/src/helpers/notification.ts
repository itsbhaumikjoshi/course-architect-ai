type NotificationCallback = (message: string) => void;

let callback: NotificationCallback | null = null;

export const setNotificationCallback = (cb: NotificationCallback) => {
    callback = cb;
};

export const showNotification = (message: string) => {
    if (callback) {
        callback(message);
    }
};
