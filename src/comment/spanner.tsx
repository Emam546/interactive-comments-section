import { useContext, useEffect, useState } from "react";
import "./style.scss";
import { LikeState } from "./type";
import { UserContext } from "../context/user";
import { UserType } from "../types";
import classNames from "classnames";
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
            <>
                <span
                    className={classNames(
                        "score absolute  translate-y-[100%]",
                        {
                            "anim-center": score - 1 == curScore,
                            "text-red-500": like == false,
                        }
                    )}
                >
                    {score - 1}
                </span>
                <span
                    className={classNames("score translate-y-0", {
                        "text-red-pale": like == "Like",
                        "text-red-500": like == "dislike",
                        "anim-bottom": score > curScore,
                        "anim-top": score < curScore,
                    })}
                >
                    {score}
                </span>
                <span
                    className={classNames("score absolute translate-y-[-100%]", {
                        "anim-center": score + 1 == curScore,
                        "text-red-pale": like == false,
                    })}
                >
                    {score + 1}
                </span>
            </>
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
            <div className="absolute md:relative bottom-0 left-0 flex md:flex-col items-center justify-center px-2 py-2 gap-1 md:gap-0 md:px-0 md:py-3 bg-light-gray-2 self-start rounded-lg min-w-[2.5rem] select-none">
                <button
                    type="button"
                    className="max-w-full cursor-pointer scale-100  hover:scale-110 transition-all p-2 aspect-square"
                    onClick={() => incrementNum(score + 1)}
                >
                    <img
                        className="w-full"
                        src="./images/icon-plus.svg"
                        alt="icon-minus"
                    />
                </button>
                <div className="flex px-1 justify-center overflow-hidden items-center h-7 relative text-lg leading-7 text-primary font-medium min-w-[2rem]">
                    <TextChanger
                        score={score}
                        curScore={curScore}
                        like={likeState}
                    />
                </div>
                <button
                    type="button"
                    onClick={() => incrementNum(score - 1)}
                    className="max-w-full cursor-pointer scale-100 hover:scale-110 transition-all p-2 aspect-square"
                >
                    <img
                        className="w-full"
                        src="./images/icon-minus.svg"
                        alt="icon-minus"
                    />
                </button>
            </div>
        </>
    );
}
