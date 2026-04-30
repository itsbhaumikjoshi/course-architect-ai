import React, { createContext, useContext, useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { setNotificationCallback } from '../helpers';

interface NotificationContextType {
    notify: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const notify = (msg: string) => {
        setMessage(msg);
        setOpen(true);
    };

    const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        setNotificationCallback(notify);
    }, []);

    return (
        <NotificationContext.Provider value={{ notify }}>
            {children}
            <Snackbar 
                open={open} 
                autoHideDuration={50000} 
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: '100%', backgroundColor: 'primary.main', color: 'white' }}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
