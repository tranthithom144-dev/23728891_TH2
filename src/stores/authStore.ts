import { create } from 'zustand';
import { STUDENT, examStamp } from '@constants/student';

interface AuthState {
    token: string | null;
    login: (fieldValue: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: null,
    login: (_fieldValue: string) => {
        const fakeToken = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
        set({ token: fakeToken });
    },
    logout: () => set({ token: null }),
}));