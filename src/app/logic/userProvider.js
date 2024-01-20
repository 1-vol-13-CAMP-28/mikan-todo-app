import { userContext } from '../logic/userContext';

const userProvider = ({ user, children }) => {
    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    );
}

export default userProvider;