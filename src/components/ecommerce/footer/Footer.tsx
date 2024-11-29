export const Footer = () => {
    return (
        <footer className="mt-auto bg-gray-900 w-full dark:bg-neutral-950">
            <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <div className="col-span-full lg:col-span-1">
                        <a
                            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
                            href="#"
                            aria-label="Brand"
                        >
                            Brand
                        </a>
                    </div>
                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Product</h4>
                        <div className="mt-3 grid space-y-3">
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Pricing
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Changelog
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Docs
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <h4 className="font-semibold text-gray-100">Company</h4>
                        <div className="mt-3 grid space-y-3">
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    About us
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Blog
                                </a>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Careers
                                </a>
                                <span className="inline-block ms-1 text-xs bg-blue-700 text-white py-1 px-2 rounded-lg">
                                    Contratando
                                </span>
                            </p>
                            <p>
                                <a
                                    className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    href="#"
                                >
                                    Customers
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="col-span-2">
                        <h4 className="font-semibold text-gray-100">Stay up to date</h4>
                        <form>
                            <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 dark:bg-neutral-900">
                                <div className="w-full">
                                    <label htmlFor="hero-input" className="sr-only">
                                        Subscribe
                                    </label>
                                    <input
                                        type="text"
                                        id="hero-input"
                                        name="hero-input"
                                        className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <a
                                    className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
                                    href="#"
                                >
                                    Subscribe
                                </a>
                            </div>
                            <p className="mt-3 text-sm text-gray-400">
                                New UI kits or big discounts. Never spam.
                            </p>
                        </form>
                    </div>
                </div>

                <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-400 dark:text-neutral-400">
                            2024 Preline Labs.
                        </p>
                    </div>

                    {/* Social Brands */}
                    <div>
                        {/* Social Media Icons */}
                        {["facebook", "twitter", "github", "linkedin"].map((icon) => (
                            <a
                                key={icon}
                                className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10"
                                href="#"
                            >
                                <svg
                                    className="shrink-0 size-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M...Z" />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
