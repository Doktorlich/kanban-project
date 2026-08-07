import InputLabel from "@/components/ui/InputLabel";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";

export default function LoginPage(){
  return (
      <div className={"container"}>
          <h1> Login</h1>
          <p>welcome back to the platform</p>
          <form className={"form-login"}>
              <InputLabel type={"email"} id={"email"} placeholder={"user@example.com"}>
                  email address
              </InputLabel>

              <InputLabel type={"password"} id={"password"} placeholder={"********"}>
                  password
              </InputLabel>

              <InputLabel type={"checkbox"} id={"remember-me"}>
                  remember me
              </InputLabel>
              <Link href={"/"}>forgot password?</Link>

              <Button type={"submit"} className={"button--primary"}>
                  login
              </Button>
              <p>
                  Don&#39;t have an account? <Link href={"/register"}>Register</Link>
              </p>
          </form>
      </div>
  );
}
