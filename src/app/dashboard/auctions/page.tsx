import { redirect } from "next/navigation";

export default function AuctionPage() {
    redirect('/dashboard/auctions/active-auctions')
}