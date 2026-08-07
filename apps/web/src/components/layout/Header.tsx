import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button/Button";

export default function Header() {
    return (
        <header className={"header"}>
            <h1 className={"main-title"}>kanban dashboard</h1>
            {/*
                по логике Input должен будет раскрывать либо модалку с поиском,
                либо сделать раскрытие input при нажатии на кнопку button,
                или сделать через ховер, при наведении раскрытия инпута
             */}
            <Input type={"search"} className={"header__search"} id={"header__search"} />
            <Button type={"button"} className={"header__share"}>
                Share
            </Button>
        </header>
    );
}
