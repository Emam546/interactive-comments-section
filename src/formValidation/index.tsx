import { useState } from "react";
import { UserType } from "../types";
export default function FormComment({
    user,
    sendValue,
    before,
    ...props
}: {
    user: UserType;
    sendValue?: string;
    before?: string;
} & React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>) {
    const [lastText, setLastText] = useState(before || "");
    return (
        <form
            id={Math.ceil(Math.random() * 1000).toString()}
            action="#"
            className="addComment bg-white p-6 rounded-lg"
            {...props}
        >
            <div className="flex gap-5 relative pb-20 md:pb-0">
                <div className="w-14 border-[50%] overflow-hidden absolute md:relative bottom-1 left-0">
                    <img
                        className="w-full aspect-square"
                        src={user.image.png}
                        alt={user.username}
                    />
                </div>
                <textarea
                    name="comment"
                    placeholder="Add a comment ..."
                    className="border-[3px] text-xl text-blue-dark focus:border-blue-dark rounded-lg p-3 min-h-[8rem] flex-1 border-solid border-light-gray-1 resize-none focus:outline-none"
                    onChange={(event) => {
                        if (!before) return;
                        if (!event.currentTarget.value.startsWith(before)) {
                            event.currentTarget.value = lastText;
                        } else setLastText(lastText);
                    }}
                    defaultValue={before}
                />
                <input
                    type="submit"
                    value={sendValue || "SEND"}
                    className="self-start hover:opacity-50 cursor-pointer  bg-primary p-4 px-9 rounded-lg text-light-gray-2 text-xl font-medium
                    absolute md:relative bottom-0 right-0
                    "
                />
            </div>
        </form>
    );
}
