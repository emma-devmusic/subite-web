'use client'
import { useAppDispatch } from "@/store";
import { getDocument } from "@/store/slices/manageUserSlice";
import { AuditImagesDocuments } from "@/types";

interface Props {
    imagesDocuments: AuditImagesDocuments[];
    userId: number | string;
}

export const AuditsImagesDocuments = ({ imagesDocuments, userId }: Props) => {

    const dispatch = useAppDispatch()


    return (
        <>
            <div className="flex gap-3 flex-wrap">
                {
                    imagesDocuments.map((img: AuditImagesDocuments, i: number) =>
                        <button
                            className="bg-white border-[1px] border-cyan-600  text-cyan-600 self-end rounded-md px-4 py-2 hover:bg-cyan-500 hover:text-white transition-all w-full sm:w-auto mt-3"
                            key={i}
                            onClick={() => dispatch(
                                getDocument(`${userId}/document/${img.id}`)
                            )}
                        >
                            {img.document_name}
                        </button>
                    )
                }
            </div>
        </>
    );
};
