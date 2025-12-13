import React, { useState } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AdminLogin: React.FC = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleSuccess = (credentialResponse: CredentialResponse) => {
        if (credentialResponse.credential) {
            try {
                // Decode to check basics, but verification happens on backend
                const decoded: any = jwtDecode(credentialResponse.credential);
                console.log('Login Success:', decoded);

                // Store the token (in real app, use HTTP-only cookies or secure storage)
                localStorage.setItem('authToken', credentialResponse.credential);

                navigate('/admin/dashboard');
            } catch (err) {
                console.error("Token decoding failed", err);
                setError("Failed to process login credentials.");
            }
        } else {
            setError("No credential received from Google.");
        }
    };

    const handleError = () => {
        console.error('Login Failed');
        setError("Login failed. Please try again.");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-art-cream">
            <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full text-center">
                <h2 className="text-3xl font-serif text-art-black mb-6">Admin Portal</h2>
                <p className="text-gray-600 mb-8">Please sign in to manage the gallery.</p>

                <div className="flex justify-center">
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                    />
                </div>

                {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

                <div className="mt-6 text-xs text-gray-400">
                    <a href="/" className="hover:text-art-black transition-colors">Return to Home</a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
