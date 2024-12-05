

export default function ProductPageLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="container-auction m-auto">
            {children}
        </div>
    );
}