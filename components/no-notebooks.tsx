import Image from "next/image"

export function NoNotebooks() {
    return (
        <div className="flex flex-col items-center justify-center py-8">
            <Image
            src="./assets/add_note.svg"
            alt="No Notebooks"
            width={160}
            height={160}
            className="mb-6"
            priority
            />
            <h2 className="text-xl font-semibold mb-2">No Notebooks Yet</h2>
            <p className="text-gray-500 mb-4 text-center max-w-xs">
            Start by creating your first notebook to organize your notes and ideas.
            </p>
        </div>
    )
}