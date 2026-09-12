"use client";
import Button from "@/components/ui/Button/Button";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import classes from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces } from "../../../../lib/workspace";
import { useState } from "react";

import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal";

export default function WorkspacesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const query = useQuery({ queryKey: ["workspace"], queryFn: getWorkspaces });

    // стилизовать параграфы в условиях
    function renderContent() {
        if (query.isPending) {
            return <p>Loading...</p>;
        }
        if (query.isError) {
            return <p>Error loading data</p>;
        }
        if (!query.data || query.data.length === 0) {
            return <p>No workspaces yet — create your first one</p>;
        }
        return (
            <ul className={classes["workspaces-cards__list"]}>
                {query.data.map(card => (
                    <WorkspaceCard card={card} key={card.id} href={`/workspaces/${card.id}`} />
                ))}
                <li className={classes["cards__item"]}>
                    <Button
                        type={"button"}
                        className={classes["workspaces-cards__add-workspace"]}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span>+</span>
                        <p>
                            Create <br /> workspace
                        </p>
                    </Button>
                </li>
            </ul>
        );
    }

    return (
        <div className={classes.workspaces}>
            <header className={classes["workspaces-header"]}>
                <div className={classes["workspaces-header__title-block"]}>
                    <h1>Your Workspaces</h1>
                    <p>{query.data?.length ?? 0} workspaces</p>
                </div>
                {/*Данная кнопка под вопросом, т к есть элемент создания внутри карточек workspaces*/}
                <Button
                    type={"button"}
                    className={classes["workspaces-header__add-workspace"]}
                    onClick={() => setIsModalOpen(true)}
                >
                    + New workspace
                </Button>
            </header>

            <section className={classes["workspaces-cards"]}>
                {isModalOpen && <CreateWorkspaceModal onClose={() => setIsModalOpen(false)} />}

                {/*На будущее подключить библиотеку Motion для реализации нормального loader,
                или насколько знаю в самом nextjs  есть нечто подобное, что позволяет отобразить
                 данные до их загрузки вроде так страница и называется loading.ts некий аналог скелетонов, так же вроде в next  есть и работа с ошибками*/}
                {renderContent()}
            </section>
        </div>
    );
}
