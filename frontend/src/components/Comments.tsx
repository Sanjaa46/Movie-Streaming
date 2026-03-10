import { FaRegCircleUser } from "react-icons/fa6";


export default function Comments({ comments, onClose }: { comments: any[], onClose: () => void }) {

    const handleOverlayClick = (e: React.MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <section className="fixed flex items-center justify-center bottom-0 left-0 right-0 z-999 w-screen h-screen bg-black/50" onClick={handleOverlayClick}>
            <div className="w-[50%] h-[50%] flex items-center justify-center rounded-2xl bg-black/90">
                <div className=" w-[80%] h-[80%]">
                    <h1 className="text-2xl">Comments</h1>
                    <p className="text-[10px]">{comments.length} comments</p>
                    <span className="flex h-[5px] w-full bg-amber-50 rounded-2xl my-2"></span>
                    <div className="flex flex-col h-[75%] overflow-y-scroll items-center gap-2 mt-5">
                        {comments.map((comment) => (
                            <div key={comment.id} className="flex w-full items-center gap-2 p-5 rounded-2xl bg-white/20">
                                <FaRegCircleUser className="text-[30px]" />
                                <div>
                                    <p className="text-sm">{comment.username}</p>
                                    <p className="text-xs">{comment.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex w-full items-center gap-2 p-5 mt-4 rounded-2xl bg-white/50">
                        <input type="text" placeholder="Add a comment" className="w-full bg-transparent border-none outline-none" />
                    </div>
                </div>
            </div>
        </section>
    )
}