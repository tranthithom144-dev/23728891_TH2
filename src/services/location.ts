export const LocationService = {
    requestForegroundPermissionsAsync: async () => {
        return { status: 'granted' as const, canAskAgain: true, granted: true, expires: 'never' };
    },
    getCurrentPositionAsync: async (_opts?: any) => {
        return {
            coords: {
                latitude: 10.8225,
                longitude: 106.6879,
                altitude: null,
                accuracy: 10,
                altitudeAccuracy: null,
                heading: null,
                speed: null,
            },
            timestamp: Date.now(),
        };
    },
};

export default LocationService;

