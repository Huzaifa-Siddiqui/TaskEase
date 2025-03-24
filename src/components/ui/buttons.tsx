import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function SignInButtons({ loading }: { loading: boolean }) {
  return (
    <div className="flex gap-4 w-full">
      <button
        onClick={() => signIn("google")}
        className="relative h-14 flex-1 overflow-hidden rounded-md border border-black text-black font-medium 
        transition-all duration-300 hover:bg-black hover:text-white group"
        disabled={loading}
      >
        <span className="relative z-10 flex items-center justify-center">
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <>Sign in with Google</>
          )}
        </span>
      </button>

      <button
        onClick={() => signIn("github")}
        className="relative h-14 flex-1 overflow-hidden rounded-md border border-black text-black font-medium 
        transition-all duration-300 hover:bg-black hover:text-white group"
        disabled={loading}
      >
        <span className="relative z-10 flex items-center justify-center">
          {loading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <>Sign in with GitHub</>
          )}
        </span>
      </button>
    </div>
  );
}
