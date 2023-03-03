import React from "react";
import { CommentType, ReplyType } from "../types";
import "./style.scss";
import { HeaderReply } from "./header";

export default function Comment({
    comment,
    setComment,
}: {
    comment: CommentType;
    setComment: React.Dispatch<CommentType | undefined>;
}) {
    const updateComment: React.Dispatch<ReplyType | undefined> = (data) => {
        if (data == undefined) return setComment(undefined);
        setComment({ ...comment, ...data });
    };
    const addComment: React.Dispatch<ReplyType> = (data) => {
        comment.replies.push(data);
        setComment({ ...comment });
    };
    return (
        <article>
            <HeaderReply
                comment={comment}
                setComment={updateComment}
                addComment={addComment}
            />

            <div className="mt-1 ml-0 pl-3 md:ml-10 md:pl-10 border-solid border-l-[3px] border-light-gray-1">
                {comment.replies.map((data, i) => {
                    const setReply = (updata: ReplyType | undefined) => {
                        if (!updata)
                            return setComment({
                                ...comment,
                                replies: comment.replies.filter(
                                    (_, ni) => ni != i
                                ),
                            });
                        comment.replies[i] = updata;
                        setComment({ ...comment });
                    };
                    const addReply = (updata: ReplyType) => {
                        comment.replies.push(updata);
                        setComment({ ...comment });
                    };
                    return (
                        <HeaderReply
                            key={i}
                            comment={data}
                            setComment={setReply}
                            addComment={addReply}
                        />
                    );
                })}
            </div>
        </article>
    );
}
