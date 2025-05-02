import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { pay1, pay2, pay3, pay4 } from '@/images';

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const [currentInfographicIndex, setCurrentInfographicIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const infographics = [
        {
            id: "1",
            name: "Smart Payments, Smarter Timing",
            description: "Automate payments with sunrise and sunset triggers. ClimaPay aligns financial actions with natural cycles for enhanced control.",
            image: pay1,
        },
        {
            id: "2",
            name: "Cross-Bank Efficiency",
            description: "Make seamless interbank and intrabank transfers. Our intuitive flow screens are built for real-time execution.",
            image: pay2,
        },
        {
            id: "3",
            name: "Stay Ahead with Weather Intelligence",
            description: "Integrated weather updates help inform your payment strategies—ideal for agriculture, logistics, and travel sectors.",
            image: pay3,
        },
        {
            id: "4",
            name: "ClimaPay: Secure. Seamless. Scalable.",
            description: "Your trusted payment solution, combining reliability with a beautifully designed interface for the modern era.",
            image: pay4,
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentInfographicIndex(prev =>
                prev === infographics.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    return (
        <>
            <Head title="ClimaPay - Weather-Aware Payment Solutions" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                <nav className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17 4L7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-2xl font-bold text-blue-600 dark:text-white">Clima<span className="text-gray-800 dark:text-blue-400">Pay</span></span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            {auth.user ? (
                                <Link
                                    href={route('customer.dashboard')}
                                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {isMobileMenuOpen && (
                        <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col space-y-4">
                                {auth.user ? (
                                    <Link
                                        href={route('customer.dashboard')}
                                        className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                                        onClick={toggleMobileMenu}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                                            onClick={toggleMobileMenu}
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-center"
                                            onClick={toggleMobileMenu}
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>

                <section className="container mx-auto px-6 py-12 md:py-24">
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="md:w-1/2 mb-12 md:mb-0">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                                Weather-Aware <span className="text-blue-600">Payment</span> Solutions
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                                Intelligent payment processing that adapts to environmental conditions for smarter financial management.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <Link
                                    href={auth.user ? route('customer.dashboard') : route('register')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center transition-colors"
                                >
                                    Start Free Trial
                                </Link>
                                <Link
                                    href="#features"
                                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg text-center transition-colors"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative">
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
                                <img
                                    src={infographics[currentInfographicIndex].image}
                                    alt={infographics[currentInfographicIndex].name}
                                    className="w-full h-auto"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                        {infographics[currentInfographicIndex].name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                                        {infographics[currentInfographicIndex].description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4 space-x-2">
                                {infographics.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentInfographicIndex(index)}
                                        className={`w-3 h-3 rounded-full ${currentInfographicIndex === index ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="bg-white dark:bg-gray-800 py-16">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                                Why Choose ClimaPay
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Innovative features designed for modern financial needs
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl">
                                <div className="bg-blue-100 dark:bg-gray-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    Secure Transactions
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Bank-grade security with end-to-end encryption and multi-factor authentication.
                                </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl">
                                <div className="bg-blue-100 dark:bg-gray-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    Weather Integration
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Schedule payments based on weather conditions for agriculture and logistics businesses.
                                </p>
                            </div>
                            <div className="bg-blue-50 dark:bg-gray-700 p-8 rounded-xl">
                                <div className="bg-blue-100 dark:bg-gray-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                                    Lightning Fast
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Process payments in seconds with our optimized transaction engine.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-blue-600 py-16">
                    <div className="container mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to transform your payments?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Join thousands of businesses using ClimaPay for smarter, weather-aware financial transactions.
                        </p>
                        <Link
                            href={auth.user ? route('customer.dashboard') : route('register')}
                            className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
                        >
                            Get Started for Free
                        </Link>
                    </div>
                </section>

                <footer className="bg-gray-100 dark:bg-gray-900 py-12">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-2 mb-6 md:mb-0">
                                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M20 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M4 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17 4L7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-xl font-bold text-gray-800 dark:text-white">ClimaPay</span>
                            </div>
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</Link>
                                <Link href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Us</Link>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
                            <p>© {new Date().getFullYear()} ClimaPay. All rights reserved.</p>
                            <p className="mt-2 text-sm">ClimaPay 1.0.0 </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
