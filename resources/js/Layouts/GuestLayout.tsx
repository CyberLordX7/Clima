import { PropsWithChildren } from 'react';
import { useAuthLayout } from './GuestLayout.hook';




export default function Guest({ children }: PropsWithChildren) {
    const h = useAuthLayout();

    return (
        <main className="grid md:grid-cols-2 items-start">
            <div className="p-4 pr-0 h-screen sticky top-0 left-0 hidden md:block">
                <div className="relative rounded-2xl overflow-hidden h-full">
                    <img
                        src={h.infographics[h.infographicIndexInView].image}
                        alt={h.infographics[h.infographicIndexInView].name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 bg-primary text-white w-full py-12 px-10 rounded-t-2xl">
                        <h1 className="text-5xl font-medium mb-8 max-w-sm tracking-tight leading-tight">
                            {h.infographics[h.infographicIndexInView].name}
                        </h1>
                        <p className="font-light max-w-xl">
                            {h.infographics[h.infographicIndexInView].description}
                        </p>

                        <div className="flex items-center mt-10 gap-1">
                            {h.infographics.map((infographic, index) => (
                                <span
                                    key={infographic.id}
                                    className={`w-16 h-1.5 rounded-full bg-white bg-opacity-40 relative block overflow-hidden`}
                                >
                                    <span
                                        className={`w-full h-full absolute top-0 left-0 bg-white ${
                                            index === h.infographicIndexInView
                                                ? "animate-fill"
                                                : index < h.infographicIndexInView
                                                ? ""
                                                : "hidden"
                                        }`}
                                    ></span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex min-h-screen bg-white relative z-[1]">
                <div className="m-auto w-10/12">
                    {/* <img src={paylogo} className="h-10 mx-auto" /> */}

                    <div className="text-center mt-6">
                    <div className="flex items-center space-x-2 text-center justify-center">
                            <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M20 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M4 7L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17 4L7 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="text-2xl font-bold text-stone-600 ">Clima<span className="text-gray-800 dark:text-blue-400">Pay</span></span>
                        </div>
                        <p className="text-stone-400 mt-2 font-light max-w-md mx-auto">
                            The Ultimate Payment Solution for Your Business
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </main>
    );
}
