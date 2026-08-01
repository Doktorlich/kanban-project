import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import NavList from "@/components/ui/NavList";

export default function Sidebar() {
    return (
        <aside className={"sidebar"}>
            <Link href={"/"} className={"top-logo"}>
                <img src="EMPTY" alt="logo image" className={"top-logo__logo-img"} />
                <span className={"top-logo__name"}> zenui</span>
            </Link>

            {/*Данный вид поиска отложить на конец разработки приложения */}
            {/*<Input type={"search"} className={"search"} placeholder={"Search..."} />*/}

            <NavList />

            <div className="user-block">
                <hr />

                <img src="PHOTO_USER" alt="user photo" className={"user-block__photo"} />

                <div className="user-info">
                    <p className="user-info__full-name">USER FULL NAME</p>
                    <p className="user-info__role">ROLE</p>
                </div>

                <Button type={"submit"} className={"user-block__button-exit"}>
                    {/*<img src="" alt="button exit image" />*/}
                    EXIT
                </Button>
            </div>
        </aside>
    );
}
