import { Bounce, toast } from "react-toastify";
import { signIn } from "../../../auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
        toast("Logged in successfully!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce
        });
      }}>
      <button type="submit" className="text-[14px] font-[400]">
        Login with Google
      </button>
    </form>
  );
}
