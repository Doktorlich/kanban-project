import { ReactNode } from "react";
import InputLabel from "@/components/ui/InputLabel";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage(): Promise<ReactNode> {
  return (
    <div className={"container"}>
      <h1>create account</h1>
      <p>get started with your free account today.</p>
      <form className={"form-register"}>
        <InputLabel type={"text"} id={"full-name"} placeholder={"John Doe"}>
          full name
        </InputLabel>

        <InputLabel type={"email"} id={"email"} placeholder={"user@example.com"}>
          email address
        </InputLabel>

        <InputLabel type={"password"} id={"password"} placeholder={"********"}>
          password
        </InputLabel>

        <InputLabel type={"password"} id={"confirm-password"} placeholder={"********"}>
          confirm password
        </InputLabel>

        <InputLabel type={"checkbox"} id={"privacy-policy"}>
          I agree to the <Link href={""}>Terms</Link> and <Link href={""}>Privacy Policy</Link>
        </InputLabel>

        <Button type={"submit"}>Create Account</Button>

        <p>
          Already have an account? <Link href={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
}
