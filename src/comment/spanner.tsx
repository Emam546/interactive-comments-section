import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { LikeState } from "./type";
import { UserContext } from "../context/user";
import { UserType } from "../types";
function TextChanger({
    score,
    curScore,
    like,
}: {
    score: number;
    curScore: number;
    like: LikeState;
}) {
    return (
        <>
            <span
                className={`score absolute  translate-y-[-100%] ${
                    score - 1 == curScore && "anim-center"
                }`}
            >
                {score - 1}
            </span>
            <span
                className={`score ${like == "Like" && "like"} translate-y-0 ${
                    score != curScore &&
                    (score > curScore ? "anim-top" : "anim-bottom")
                }`}
            >
                {score}
            </span>
            <span
                className={`score ${
                    like == false && "like"
                } absolute translate-y-[100%] ${
                    score + 1 == curScore && "anim-center"
                }`}
            >
                {score + 1}
            </span>
        </>
    );
}
export default function Spanner({
    score,
    setScore,
    user,
}: {
    score: number;
    setScore: React.Dispatch<number>;
    user: UserType;
}) {
    const [curScore, setCurScore] = useState(score);
    const [like, setLike] = useState<LikeState>(false);
    const [likeState, setLikeS] = useState<LikeState>(false);
    
    const curUser = useContext(UserContext);
    const incrementNum = (num: number) => {
        if (curUser?.username == user.username) return;
        if (like == false) {
            setCurScore(num);
            if (num > score) setLike("Like");
            else setLike("dislike");
        } else if (like == "Like" && num < score) {
            setLike(false);
            setCurScore(num);
        } else if (like == "dislike" && num > score) {
            setLike(false);
            setCurScore(num);
        }
    };
    useEffect(() => {
        setTimeout(() => {
            setScore(curScore);
            setLikeS(like);
            setLike(like);
        }, 400);
    }, [curScore]);
    return (
        <>
            <div className="absolute md:relative bottom-0 left-0 flex md:flex-col items-center justify-center gap-3 px-3 md:px-0 py-1 md:py-4 bg-light-gray-2 self-start rounded-lg min-w-[2.5rem] select-none">
                <img
                    className="max-w-full cursor-pointer scale-100  hover:scale-110 transition-all"
                    src="./images/icon-plus.svg"
                    alt="icon-minus"
                    onClick={() => incrementNum(score + 1)}
                />
                <div className="flex  px-1 justify-center overflow-hidden items-center h-7 relative text-lg leading-7 text-primary font-medium">
                    <TextChanger
                        score={score}
                        curScore={curScore}
                        like={likeState}
                    />
                </div>
                <img
                    className="max-w-full cursor-pointer scale-100  hover:scale-150 transition-all"
                    src="./images/icon-minus.svg"
                    alt="icon-minus"
                    onClick={() => incrementNum(score - 1)}
                />
            </div>
        </>
    );
}
