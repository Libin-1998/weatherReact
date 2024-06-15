import React, { useState, useEffect } from 'react';

const LocationPermission = () => {
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [status, setStatus] = useState('Requesting location...');

    useEffect(() => {
        const requestLocation = () => {
            if ("geolocation" in navigator) {
                navigator.geolocation.watchPosition(
                    (position) => {
                        setLocation({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        });
                        setStatus('Location obtained successfully!');
                    },
                    (error) => {
                        switch (error.code) {
                            case error.PERMISSION_DENIED:
                                setStatus('User denied the request for Geolocation.');
                                break;
                            case error.POSITION_UNAVAILABLE:
                                setStatus('Location information is unavailable.');
                                break;
                            case error.TIMEOUT:
                                setStatus('The request to get user location timed out.');
                                break;
                            default:
                                setStatus('An unknown error occurred.');
                                break;
                        }
                    },
                    { timeout: 10000, maximumAge: 0, enableHighAccuracy: true }
                );
            } else {
                setStatus('Geolocation is not supported by your browser.');
            }
        };

        requestLocation();
    }, []);

    return (
        <div>
            <h1>Location Permission Request</h1>
            <p>Status: {status}</p>
            {location.latitude && location.longitude && (
                <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
            )}
        </div>
    );
};

export default LocationPermission;
