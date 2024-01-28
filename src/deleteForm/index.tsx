import { ReactNode, createContext, useState } from "react";
export const DeleteFomContext = createContext<React.Dispatch<() => void>>(
    () => {}
);
export function DeleteFormProvider({ children }: { children: ReactNode }) {
    const [stateDelete, setDeleteState] = useState(false);
    const [func, funcDelete] = useState<() => void>(() => () => {});

    return (
        <DeleteFomContext.Provider
            value={(resfunc) => {
                funcDelete(resfunc);
                setDeleteState(true);
            }}
        >
            {children}
            <div
                className={`w-full px-2 h-screen left-0 top-0 bg-black/50 fixed flex justify-center items-center ${
                    !stateDelete && "invisible"
                }`}
            >
                <div
                    className={`p-6 bg-white rounded-lg max-w-xs transition-all duration-500  ${
                        stateDelete ? "scale-100" : "scale-0"
                    }`}
                >
                    <h2 className="font-medium text-blue-dark text-xl">
                        Delete comment
                    </h2>
                    <p className="text-blue-gray text-sm my-3">
                        Are you sure you wan delete this comment? this will
                        remove the comment and it can't be undone
                    </p>
                    <div className="flex justify-between  flex-wrap text-white text-sm">
                        <input
                            type="button"
                            onClick={() => setDeleteState(false)}
                            className="px-6 py-2 bg-blue-gray hover:opacity-50  cursor-pointer rounded-lg"
                            value="NO,CANCEL"
                        />
                        <input
                            type="button"
                            onClick={() => {
                                func();
                                setDeleteState(false);
                            }}
                            className="px-6 py-2 bg-warn hover:opacity-50 cursor-pointer rounded-lg"
                            value="YES,DELETE"
                        />
                    </div>
                </div>
            </div>
        </DeleteFomContext.Provider>
    );
}
