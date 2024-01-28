import React, { useContext, useEffect, useState } from "react";
import { ReplyType } from "../types";
import { UserContext } from "../context/user";
import FormComment from "../formValidation";
import Spanner from "./spanner";
import { DeleteFomContext as DeleteFormContext } from "../deleteForm";
function UpdateForm({
    content,
    before,
    ...props
}: { content: string; before?: string } & React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
>) {
    const [lastText, setLastText] = useState(before || "");
    return (
        <form
            action="#"
            className="mt-2 pl-3"
            {...props}
        >
            <textarea
                name="comment"
                className="border-[3px] w-full block text-blue-dark focus:border-blue-dark rounded-lg p-3 min-h-[8rem] border-solid border-light-gray-1 resize-none focus:outline-none "
                onChange={(event) => {
                    if (!before) return;
                    if (!event.currentTarget.value.startsWith(before)) {
                        event.currentTarget.value = lastText;
                    } else setLastText(lastText);
                }}
                defaultValue={`${before || ""}${content}`}
            />

            <input
                type="submit"
                value="UPLOAD"
                className="mt-4 hover:opacity-50 cursor-pointer block w-fit ml-auto bg-primary p-4 px-9 rounded-lg text-light-gray-2 text-xl font-medium"
            />
        </form>
    );
}
export function HeaderReply({
    comment,
    setComment,
    addComment,
}: {
    comment: ReplyType;
    setComment: React.Dispatch<ReplyType | undefined>;
    addComment: React.Dispatch<ReplyType>;
}) {
    const { user, score, createdAt, replyingTo } = comment;
    const curUser = useContext(UserContext);
    const [replyState, setReply] = useState(false);
    const [editState, setEditState] = useState(false);
    const setScore = (num: number) => {
        setComment({ ...comment, score: num });
    };
    const setDeleteForm = useContext(DeleteFormContext);
    const setEdit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let content = data.get("comment");

        if (typeof content == "string") {
            if (replyingTo)
                content = content.slice(replyingTo.length + 1, content.length);
            setComment({ ...comment, content });
            setEditState(false);
        }
    };
    if (!curUser) return <></>;
    return (
        <>
            <div className="mb-4">
                <div className="mb-2 rounded-lg p-6 bg-white">
                    <div className="flex gap-4 relative pb-12 md:pb-0">
                        <Spanner
                            user={user}
                            score={score}
                            setScore={setScore}
                        />
                        <div className="flex-1 max-md:flex-col">
                            <div className="flex justify-between items-center flex-wrap">
                                <div className="flex gap-3 flex-wrap">
                                    <div className="w-7 rounded-[50%] overflow-hidden">
                                        <img
                                            src={user.image.png}
                                            alt={user.username}
                                            className="aspect-square w-full"
                                        />
                                    </div>
                                    <span className="font-bold text-blue-dark">
                                        {user.username}
                                    </span>
                                    {user.username == curUser.username && (
                                        <span className="bg-primary px-2 text-sm text-white self-center select-none">
                                            you
                                        </span>
                                    )}
                                    <span className="text-blue-gray">
                                        {createdAt}
                                    </span>
                                </div>

                                <div className="flex gap-4 md:gap-8 py-2 flex-wrap absolute bottom-0 right-0 md:relative select-none font-semibold">
                                    {user.username == curUser.username ? (
                                        <>
                                            <button
                                                onClick={() => {
                                                    setDeleteForm(() => {
                                                        return () => {
                                                            setComment(
                                                                undefined
                                                            );
                                                        };
                                                    });
                                                }}
                                                className="flex hover:opacity-50 text-warn items-center gap-1 cursor-pointer "
                                            >
                                                <img
                                                    className="w-3"
                                                    src="./images/icon-delete.svg"
                                                    alt="edit-icon"
                                                />
                                                <span>Delete</span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditState(true);
                                                }}
                                                className="flex hover:opacity-50 text-blue-dark items-center gap-1 cursor-pointer"
                                            >
                                                <img
                                                    className="w-3"
                                                    src="./images/icon-edit.svg"
                                                    alt="edit-icon"
                                                />
                                                <span>Edit</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => setReply(true)}
                                            className="flex hover:opacity-50 text-primary items-center gap-1 cursor-pointer"
                                        >
                                            <img
                                                className="w-3"
                                                src="./images/icon-reply.svg"
                                                alt="reply-icon"
                                            />
                                            <span>Reply</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {editState ? (
                                <UpdateForm
                                    before={
                                        comment.replyingTo &&
                                        `@${comment.replyingTo} `
                                    }
                                    content={comment.content}
                                    onSubmit={setEdit}
                                />
                            ) : (
                                <p className="mt-2 pl-3 text-blue-gray">
                                    {comment.replyingTo && (
                                        <a className="text-primary font-bold">
                                            @{comment.replyingTo}{" "}
                                        </a>
                                    )}

                                    {comment.content
                                        .split("\n")
                                        .map((text, i) => {
                                            return (
                                                <span key={i}>
                                                    {text}
                                                    <br />
                                                </span>
                                            );
                                        })}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                {replyState && (
                    <FormComment
                        user={curUser}
                        sendValue="REPLY"
                        before={`@${user.username} `}
                        onSubmit={(event) => {
                            event.preventDefault();
                            const data = new FormData(event.currentTarget);
                            let content = data.get("comment");
                            if (typeof content == "string") {
                                content = content.slice(
                                    user.username.length + 1,
                                    content.length
                                );
                                addComment({
                                    user: curUser,
                                    content,
                                    createdAt: "Now",
                                    id: Math.ceil(Math.random() * 10000),
                                    score: 0,
                                    replyingTo: user.username,
                                });
                                setReply(false);
                            }
                        }}
                    />
                )}
            </div>
        </>
    );
}
