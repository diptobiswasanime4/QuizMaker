import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import getFirstnameFromName from "@/utils/getFirstnameFromName";

async function Profile() {
  const session = await getServerSession(options);
  console.log("Session:", session);

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl py-4">
        {session?.user?.email
          ? `Welcome back ${getFirstnameFromName(session?.user?.name)}!`
          : "Welcome back Mr. Anon"}
      </div>
      <img
        src={
          session?.user?.profile.picture
            ? session?.user?.profile.picture // for Google
            : session?.user?.profile.avatar_url // for GitHub
        }
        alt="Avatar"
        className="rounded-full w-32 border-4 border-gray-700"
      />
    </div>
  );
}

export default Profile;
