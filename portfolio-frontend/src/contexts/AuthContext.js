import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

const SESSION_DURATION = 3 * 60 * 60 * 1000; // 3 hours in ms

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const manualAuthInProgress = useRef(false);

    const isSessionValid = () => {
        const timestamp = localStorage.getItem('adminLoginTimestamp');
        if (!timestamp) return false;
        return Date.now() - parseInt(timestamp, 10) < SESSION_DURATION;
    };

    const login = async (email, password) => {
        manualAuthInProgress.current = true;
        const result = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem('adminLoginTimestamp', Date.now().toString());
        setCurrentUser(result.user);
        // Allow onAuthStateChanged to settle before accepting events again
        setTimeout(() => { manualAuthInProgress.current = false; }, 2000);
        return result;
    };

    const signup = async (email, password) => {
        manualAuthInProgress.current = true;
        const result = await createUserWithEmailAndPassword(auth, email, password);
        localStorage.setItem('adminLoginTimestamp', Date.now().toString());
        setCurrentUser(result.user);
        setTimeout(() => { manualAuthInProgress.current = false; }, 2000);
        return result;
    };

    const logout = async () => {
        localStorage.removeItem('adminLoginTimestamp');
        setCurrentUser(null);
        await signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // Skip intermediate events during manual login/signup
            if (manualAuthInProgress.current) {
                setLoading(false);
                return;
            }

            if (user && isSessionValid()) {
                setCurrentUser(user);
            } else if (user && !isSessionValid()) {
                // Session expired — sign out
                signOut(auth);
                localStorage.removeItem('adminLoginTimestamp');
                setCurrentUser(null);
            } else {
                setCurrentUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
        // eslint-disable-next-line
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        isSessionValid,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
