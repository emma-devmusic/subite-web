
export const ButtonSmall = ({text, classes }: { text: string; classes?: string }) => {
    
    return (
        <button className={`text-white py-1 px-8 border-2 border-cyan-600 bg-cyan-600  hover:border-white hover:bg-white hover:text-gray-900 transition-all ${classes}`}>{text}</button>
    )
}

