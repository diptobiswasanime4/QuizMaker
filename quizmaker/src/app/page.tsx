import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import getFirstnameFromName from "@/utils/getFirstnameFromName";

export default async function Home() {
  const session = await getServerSession(options);

  return (
    <div className="">
      <div className="text-xl text-center py-2">
        {session?.user?.email
          ? `Welcome back ${getFirstnameFromName(session?.user?.name)}!`
          : "Welcome back Mr. Anon"}
      </div>
    </div>
  );
}
