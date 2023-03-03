import { ReactNode, createContext, useContext } from "react";
import { UserType } from "../types";
import { currentUser } from "../data";

export const UserContext = createContext<UserType | null>(null);
export function UserProvider({children}:{children:ReactNode}) {
    const user = currentUser;
    return <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>;
}
