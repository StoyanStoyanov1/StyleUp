'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SunMoon, LayoutGrid, Bell, Settings, LogOut, User, Bug } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import { useAuth } from '@/src/hooks/useAuth';

const Header: React.FC = () => {
    const { user, logout, isDebugMode } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!user && !isDebugMode) {
            const redirectPath = encodeURIComponent(pathname || '/');
            router.push(`/auth/login?redirect=${redirectPath}`);
        }
    }, [user, router, pathname, isDebugMode]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        await logout();
        const redirectPath = encodeURIComponent(pathname || '/');
        router.push(`/auth/login?redirect=${redirectPath}`);
    };

    const getInitials = () => {
        if (!user || !user.email) return 'U';
        return user.email.charAt(0).toUpperCase();
    };

    if (!user && !isDebugMode) {
        return null;
    }

    return (
        <header className="bg-white shadow-sm h-16 flex items-center">
            <div className="mx-auto max-w-7xl w-full px-6 flex items-center justify-between">
                <SearchBar />

                <div className="flex items-center space-x-4">
                    {process.env.NODE_ENV === 'development' && isDebugMode && (
                        <div className="flex items-center text-green-700 bg-green-100 px-2 py-1 rounded text-xs font-medium">
                            <Bug size={14} className="mr-1" />
                            <span>Debug Mode</span>
                        </div>
                    )}
                    
                    <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <SunMoon size={20} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <LayoutGrid size={20} />
                    </button>
                    <div className="relative">
                        <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors">
                            <Bell size={20} />
                        </button>
                        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Settings size={20} />
                    </button>
                    
                    <div className="relative" ref={dropdownRef}>
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-medium border-2 border-white shadow-sm hover:bg-blue-600 transition-colors"
                        >
                            {getInitials()}
                        </button>
                        
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                                    {isDebugMode ? 'Debug User' : (user?.email || 'User')}
                                    {isDebugMode && (
                                        <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                            Debug
                                        </span>
                                    )}
                                </div>
                                
                                <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center">
                                        <User size={16} className="mr-2" />
                                        Profile
                                    </div>
                                </a>
                                
                                <button 
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center">
                                        <LogOut size={16} className="mr-2" />
                                        Log out
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;