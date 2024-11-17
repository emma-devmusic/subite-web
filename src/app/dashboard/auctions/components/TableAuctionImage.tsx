
interface Props {
    urlImg: string;
}

export const TableAuctionImage = ({urlImg}: Props) => {



    return (
        <img className="h-10 w-10 rounded-full inline-block" src={urlImg} alt="Neil Sims avatar" />
    );
};
