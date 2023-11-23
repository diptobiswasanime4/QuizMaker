import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

async function Navbar() {
  const session = await getServerSession(options);

  return (
    <div className="bg-black text-white py-2 flex justify-between text-lg">
      <div className="flex gap-4 pl-4">
        <Link href={`/`} className="cursor-pointer hover:text-blue-200">
          Home
        </Link>
        <Link
          href={`/dashboard`}
          className="cursor-pointer hover:text-blue-200"
        >
          Dashboard
        </Link>
        <Link href={`/create`} className="cursor-pointer hover:text-blue-200">
          Create
        </Link>
        <Link href={`/profile`} className="cursor-pointer hover:text-blue-200">
          Profile
        </Link>
      </div>
      {session ? (
        <Link
          href={"/api/auth/signout?callbackUrl=/"}
          className="cursor-pointer hover:text-blue-200 text-xl pr-4"
        >
          Signout
        </Link>
      ) : (
        <Link
          href={`/api/auth/signin`}
          className="cursor-pointer hover:text-blue-200 text-xl pr-4"
        >
          Signin
        </Link>
      )}
    </div>
  );
}

export default Navbar;
