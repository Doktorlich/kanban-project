"use client";
import InputLabel from "@/components/ui/InputLabel/InputLabel";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import classes from "../auth-form.module.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../../lib/auth";
export default function RegisterPage() {
    const router = useRouter();
    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            router.push("/login");
        },
    });
    function handleSubmit(formData: FormData) {
        const payload = {
            email: formData.get("email") as string,
            firstName: formData.get("first-name") as string,
            lastName: formData.get("last-name") as string,
            username: formData.get("username") as string,
            password: formData.get("password") as string,
            // privacyPolicy: formData.get("privacy-policy") as string,
        };
        mutation.mutate(payload);
    }

    return (
        <div className={classes.container}>
            <div className={classes.page}>
                <h1 className={classes["page__h1"]}>create account</h1>
                <p className={classes["page__greeting"]}>Get started with your free account today.</p>
                <form className={classes["page__form"]} action={handleSubmit}>
                    {/*Временный вид ошибки, будет исправлено на промежуточном пункте с валидацией */}
                    {mutation.isError && <p className={classes.error}>{mutation.error.message}</p>}
                    <InputLabel
                        type={"email"}
                        id={"email"}
                        name={"email"}
                        placeholder={"user@example.com"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        required
                    >
                        Email address
                    </InputLabel>
                    <InputLabel
                        type={"text"}
                        id={"first-name"}
                        name={"first-name"}
                        placeholder={"John"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        required
                    >
                        First Name
                    </InputLabel>
                    <InputLabel
                        type={"text"}
                        id={"last-name"}
                        name={"last-name"}
                        placeholder={"Doe"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        required
                    >
                        Last Name
                    </InputLabel>
                    <InputLabel
                        type={"text"}
                        id={"username"}
                        name={"username"}
                        placeholder={"John Doe"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        required
                    >
                        Username
                    </InputLabel>
                    <InputLabel
                        type={"password"}
                        id={"password"}
                        name={"password"}
                        placeholder={"********"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        required
                    >
                        Password
                    </InputLabel>
                    <InputLabel
                        type={"password"}
                        id={"confirm-password"}
                        name={"confirm-password"}
                        placeholder={"********"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        required
                    >
                        Confirm password
                    </InputLabel>
                    <InputLabel
                        type={"checkbox"}
                        id={"privacy-policy"}
                        name={"privacy-policy"}
                        variant={"checkbox"}
                        className={classes["page__input-checkbox"]}
                        labelClassName={classes["page__input-checkbox--label-privacy"]}
                        required
                    >
                        I agree to the <Link href={""}>Terms</Link> and <Link href={""}>Privacy Policy</Link>
                    </InputLabel>
                    <Button type={"submit"} disabled={mutation.isPending}>
                        Create Account
                    </Button>
                    <p className={classes["page__auth-switch"]}>
                        Already have an account? <Link href={"/login"}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
