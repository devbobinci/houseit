import { Dispatch, createContext, useContext, useState } from "react";

type UserPanelContext = {
  toggleUserPanel: boolean;
  setToggleUserPanel: Dispatch<React.SetStateAction<boolean>>;
};

const UserPanelContext = createContext({} as UserPanelContext);

type Props = {
  children: React.ReactNode;
};

export function UserPanelContextProvider({ children }: Props) {
  const [toggleUserPanel, setToggleUserPanel] = useState<boolean>(false);

  return (
    <UserPanelContext.Provider
      value={{
        toggleUserPanel,
        setToggleUserPanel,
      }}
    >
      {children}
    </UserPanelContext.Provider>
  );
}

export default UserPanelContext;

export function useUserPanelContext() {
  return useContext(UserPanelContext);
}
