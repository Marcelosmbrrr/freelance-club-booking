import { usePage } from "@inertiajs/react";

export function Hero() {
    const { club }: any = usePage().props;
    return (
        <div
            id="begin"
            className="relative px-4 h-72 shadow-md bg-cover bg-center"
            style={{
                backgroundImage:
                    "url('https://wallpaperaccess.com/full/1507858.jpg')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="relative py-24 mx-auto max-w-screen-xl text-center">
                <h1 className="text-4xl font-bold tracking-tight leading-none text-white mb-4 md:text-5xl lg:text-6xl">
                    {club.data.user.name}
                </h1>
                <p className="text-lg font-normal text-gray-300 mb-8 lg:text-xl sm:px-16 xl:px-48">
                    {club.data.description}
                </p>
            </div>
        </div>
    );
}