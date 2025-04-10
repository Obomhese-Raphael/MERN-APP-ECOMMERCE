import { UserButton, useUser } from '@clerk/clerk-react';

const UserProfile = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <>
          <UserButton afterSignOutUrl="/sign-in" />
        </>
      ) : (
        <a href="/sign-in" className="text-sm font-medium hover:underline">
          Sign In
        </a>
      )}
    </div>
  );
};

export default UserProfile;