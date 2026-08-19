import InputLabel from "@/components/ui/InputLabel/InputLabel";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import classes from "../auth-form.module.scss";
export default function RegisterPage() {
    return (
        <div className={classes.container}>
            <div className={classes.page}>
                <h1 className={classes["page__h1"]}>create account</h1>
                <p className={classes["page__greeting"]}>Get started with your free account today.</p>
                <form className={classes["page__form"]}>
                    <InputLabel
                        type={"text"}
                        id={"full-name"}
                        placeholder={"John Doe"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                    >
                        Full name
                    </InputLabel>

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
                        type={"password"}
                        id={"confirm-password"}
                        placeholder={"********"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                    >
                        Confirm password
                    </InputLabel>

                    <InputLabel
                        type={"checkbox"}
                        id={"privacy-policy"}
                        variant={"checkbox"}
                        className={classes["page__input-checkbox"]}
                        labelClassName={classes["page__input-checkbox--label-privacy"]}
                    >
                        I agree to the <Link href={""}>Terms</Link> and <Link href={""}>Privacy Policy</Link>
                    </InputLabel>

                    <Button type={"submit"}>Create Account</Button>

                    <p className={classes["page__auth-switch"]}>
                        Already have an account? <Link href={"/login"}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
