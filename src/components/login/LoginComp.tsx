import Image from "next/image";
import LoginForm from "./LoginForm";
import SignIn from "./SignInComp";

function LoginComp() {
  return (
    <div className="h-[100vh]">
      <div className="grid sm:grid-cols-2 ">
        <div
          className="hidden sm:block"
          style={{
            backgroundImage: `url("/login.svg")`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}></div>

        {/* Right side (empty for now) */}
        <div className="pl-[4vw] pr-[7vw]">
          <div className="flex justify-center items-center h-[100vh]">
            <div className="md:pt-0 md:pb-0 pt-[8vh] pb-[4vh]">
              <h1 className="text-[#E238C4] text-[29.45px] font-bold  text-center py-[3vh]">
                JobTracker
              </h1>
              <LoginForm />
              <div>
                <h5 className="text-center font-[400] text-[16px] text-[#888888] pb-[2vh]">
                  OR
                </h5>
                <div className="py-[1vh] rounded-md  ring-1 ring-[#B0B0B0] cursor-pointer">
                  <div className="flex  items-center justify-center gap-2">
                    <Image
                      src="/google.svg"
                      width={15}
                      height={15}
                      alt="google-logo"
                    />
                    <SignIn />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
