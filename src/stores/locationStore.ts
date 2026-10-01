import { create } from 'zustand';
import { Linking } from 'react-native';
import { LocationService as Location } from '../services/location';
import { BASE_SHIP_FEE, VARIANT } from '../constants/student';

const KTX_GATE_LAT = 10.8222;
const KTX_GATE_LON = 106.6875;

function calculateHaversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

interface LocationState {
    status: 'idle' | 'granted' | 'denied' | 'blocked';
    distanceKm: number | null;
    shipFee: number | null;
    requestLocation: () => Promise<void>;
    openSettings: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    status: 'idle',
    distanceKm: null,
    shipFee: null,
    requestLocation: async () => {
        const { status: currentStatus, canAskAgain } = await Location.requestForegroundPermissionsAsync();

        if (currentStatus === 'granted') {
            const loc = await Location.getCurrentPositionAsync({});
            const km = calculateHaversine(loc.coords.latitude, loc.coords.longitude, KTX_GATE_LAT, KTX_GATE_LON);

            const fee =
                VARIANT.shipFormula === 'A'
                    ? BASE_SHIP_FEE + Math.round(km * 2000)
                    : BASE_SHIP_FEE + Math.round(km * 1500) + 2000;

            set({ status: 'granted', distanceKm: km, shipFee: fee });
        } else if (!canAskAgain) {
            set({ status: 'blocked' });
        } else {
            set({ status: 'denied' });
        }
    },
    openSettings: () => {
        Linking.openSettings();
    },
}));
