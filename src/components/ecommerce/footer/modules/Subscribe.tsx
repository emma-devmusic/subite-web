

export const Subscribe = () => {
    return (
        <div className="col-span-2">
            <h4 className="font-semibold text-gray-500">Stay up to date</h4>
            <form>
                <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 border-2 border-primary">
                    <div className="w-full">
                        <label htmlFor="hero-input" className="sr-only">
                            Subscríbete
                        </label>
                        <input
                            type="text"
                            id="hero-input"
                            name="hero-input"
                            className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 "
                            placeholder="Enter your email"
                        />
                    </div>
                    <button
                        className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primary text-white transition-all hover:bg-primaryHover"
                    >
                        Subscribe
                    </button>
                </div>
                <p className="mt-3 text-sm text-gray-400">
                    New UI kits or big discounts. Never spam.
                </p>
            </form>
        </div>
    )
}
