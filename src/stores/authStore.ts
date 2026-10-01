import { create } from 'zustand';
import { STUDENT, examStamp } from '../constants/student';

interface AuthState {
    token: string | null;
    userField: string;
    login: (fieldValue: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    userField: '0867457005',
    login: (fieldValue: string) => {
        const fakeToken = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
        set({ token: fakeToken, userField: fieldValue || '0867457005' });
    },
    logout: () => set({ token: null }),
}));