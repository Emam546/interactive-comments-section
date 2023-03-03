import { useContext, useState } from "react";
import "./App.scss";
import Comment from "./comment";
import { comments } from "./data";
import { CommentType } from "./types";
import { UserContext, UserProvider } from "./context/user";
import FormComment from "./formValidation";
function App() {
    const [curComment, setComments] = useState(comments);
    const curUser = useContext(UserContext);
    return (
        <div className="bg-light-gray-2">
            <div className="container p-4 m-auto flex flex-col min-h-[100vh]">
                <main className="flex-1">
                    {curComment.map((data, i) => {
                        const val: React.Dispatch<CommentType | undefined> = (
                            com
                        ) => {
                            if (com == undefined)
                                return setComments(
                                    curComment.filter((_, ni) => ni != i)
                                );
                            comments[i] = com;
                            setComments([...comments]);
                        };
                        return (
                            <Comment
                                key={i}
                                comment={data}
                                setComment={val}
                            />
                        );
                    })}
                </main>
                {curUser && (
                    <FormComment
                        user={curUser}
                        onSubmit={(event) => {
                            event.preventDefault();
                            const data = new FormData(event.currentTarget);
                            const content = data.get("comment");
                            if (typeof content == "string") {
                                setComments([
                                    ...curComment,
                                    {
                                        user: curUser,
                                        content,
                                        createdAt: "Now",
                                        id: Math.ceil(Math.random() * 10000),
                                        score: 0,
                                        replies: [],
                                    },
                                ]);
                                const elements = event.currentTarget.elements;
                                for (let i = 0; i < elements.length; i++)
                                    (elements[i] as any).value = "";
                            }
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
