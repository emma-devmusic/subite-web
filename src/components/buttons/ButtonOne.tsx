
export const ButtonOne = ({text, classes }: { text: string; classes?: string }) => {
    
    return (
        <button className={`text-white py-2 px-10 border-2 border-white  hover:border-white hover:bg-white hover:text-gray-900 transition-all ${classes}`}>{text}</button>
    )
}