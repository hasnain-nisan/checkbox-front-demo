export const fbConfig = {
    appId: "649375589884597"
}

export function loadFacebookSDK() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://connect.facebook.net/en_US/sdk.js';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';

        script.onload = () => {
            // Facebook SDK has been loaded successfully
            resolve(window.FB);
        };

        script.onerror = () => {
            // Failed to load the Facebook SDK
            reject(new Error('Failed to load Facebook SDK'));
        };

        document.head.appendChild(script);
    });
}