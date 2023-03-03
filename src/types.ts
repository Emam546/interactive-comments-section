export type UserType = {
    image: {
        png: string;
        webp: string;
    };
    username: string;
};
type Without<T, K> = Pick<T, Exclude<keyof T, K>>;
export type ReplyType = (Without<CommentType, "replies"> & {
    replyingTo?: string;
});
export type CommentType = {
    id: number | string;
    content: string;
    createdAt: string;
    score: number;
    user: UserType;
    replies: ReplyType[];
};
