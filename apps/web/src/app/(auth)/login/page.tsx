import InputLabel from "@/components/ui/InputLabel/InputLabel";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import classes from "../auth-form.module.scss";

export default function LoginPage() {
    return (
        <div className={classes.container}>
            <div className={classes.page}>
                <h1 className={classes["page__h1"]}> Login</h1>
                <p className={classes["page__greeting"]}>Welcome back to the platform</p>
                <form className={classes["page__form"]}>
                    <InputLabel
                        type={"email"}
                        id={"email"}
                        placeholder={"user@example.com"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                    >
                        Email address
                    </InputLabel>

                    <InputLabel
                        type={"password"}
                        id={"password"}
                        placeholder={"********"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                    >
                        Password
                    </InputLabel>

                    <InputLabel
                        type={"checkbox"}
                        id={"remember-me"}
                        variant={"checkbox"}
                        className={classes["page__input-checkbox"]}
                        labelClassName={classes["page__input-checkbox--label"]}
                    >
                        Remember me
                    </InputLabel>
                    <Link href={"/"} className={classes["page__restore-pass"]}>
                        Forgot password?
                    </Link>

                    <Button type={"submit"}>login</Button>
                    <p className={classes["page__auth-switch"]}>
                        Don&#39;t have an account? <Link href={"/register"}>Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
