import { Vibration } from 'react-native';

export const Haptics = {
    ImpactFeedbackStyle: {
        Light: 'light',
        Medium: 'medium',
        Heavy: 'heavy',
    },
    impactAsync: async (_style?: any) => {
        try {
            if (Vibration && typeof Vibration.vibrate === 'function') {
                Vibration.vibrate(40);
            }
        } catch (_e) {}
    },
    selectionAsync: async () => {
        try {
            if (Vibration && typeof Vibration.vibrate === 'function') {
                Vibration.vibrate(20);
            }
        } catch (_e) {}
    },
    notificationAsync: async (_type?: any) => {
        try {
            if (Vibration && typeof Vibration.vibrate === 'function') {
                Vibration.vibrate(30);
            }
        } catch (_e) {}
    },
};

export default Haptics;
