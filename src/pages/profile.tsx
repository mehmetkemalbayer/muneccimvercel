import { Authenticator } from '@aws-amplify/ui-react';
import { NextPage } from 'next';

const Profile: NextPage = () => {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <main>
                    <h1>Hello {user?.username}</h1>
                    <button onClick={signOut}>Sign out</button>
                </main>
            )}
        </Authenticator>
    );
}

export default Profile;