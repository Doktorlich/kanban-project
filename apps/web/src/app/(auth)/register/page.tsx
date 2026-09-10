"use client";
import InputLabel from "@/components/ui/InputLabel/InputLabel";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import classes from "../auth-form.module.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../../../lib/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema } from "../../../../lib/register-form.schema";

export default function RegisterPage() {
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            router.push("/login");
        },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(registerFormSchema) });

    return (
        <div className={classes.container}>
            <div className={classes.page}>
                <h1 className={classes["page__h1"]}>create account</h1>
                <p className={classes["page__greeting"]}>Get started with your free account today.</p>
                <form
                    className={classes["page__form"]}
                    onSubmit={handleSubmit(data => {
                        const { confirmPassword, ...payload } = data;
                        mutation.mutate(payload);
                    })}
                >
                    {/*Временный вид ошибки, будет исправлено на промежуточном пункте с валидацией */}
                    <InputLabel
                        type={"email"}
                        id={"email"}
                        placeholder={"user@example.com"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        {...register("email")}
                    >
                        Email address
                    </InputLabel>
                    {errors.email && <p className={classes.error}>{errors.email.message}</p>}
                    {mutation.isError && <p className={classes.error}>{mutation.error.message}</p>}

                    <InputLabel
                        type={"text"}
                        id={"first-name"}

                        placeholder={"John"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        {...register("firstName")}
                    >
                        First Name
                    </InputLabel>
                    {errors.firstName && <p className={classes.error}>{errors.firstName.message}</p>}
                    <InputLabel
                        type={"text"}
                        id={"last-name"}
                        placeholder={"Doe"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        {...register("lastName")}
                    >
                        Last Name
                    </InputLabel>
                    {errors.lastName && <p className={classes.error}>{errors.lastName.message}</p>}
                    <InputLabel
                        type={"text"}
                        id={"username"}
                        placeholder={"John Doe"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        {...register("username")}
                    >
                        Username
                    </InputLabel>
                    {errors.username && <p className={classes.error}>{errors.username.message}</p>}
                    <InputLabel
                        type={"password"}
                        id={"password"}
                        placeholder={"********"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        {...register("password")}
                    >
                        Password
                    </InputLabel>
                    {errors.password && <p className={classes.error}>{errors.password.message}</p>}
                    <InputLabel
                        type={"password"}
                        id={"confirm-password"}
                        placeholder={"********"}
                        labelClassName={classes["page__input-text--label"]}
                        className={classes["page__input-text"]}
                        {...register("confirmPassword")}
                    >
                        Confirm password
                    </InputLabel>
                    {errors.confirmPassword && <p className={classes.error}>{errors.confirmPassword.message}</p>}
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
