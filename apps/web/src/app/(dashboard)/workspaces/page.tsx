"use client";
import Button from "@/components/ui/Button/Button";
import WorkspaceCard from "@/components/workspace/WorkspaceCard";
import classes from "./page.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getWorkspaces, workspaceKeys } from "@/lib/workspace";
import { useState } from "react";

import CreateWorkspaceModal from "@/components/workspace/CreateWorkspaceModal/CreateWorkspaceModal";
import queryState from "@/lib/query-state";

export default function WorkspacesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const query = useQuery({ queryKey: workspaceKeys.all, queryFn: getWorkspaces });

    // стилизовать параграфы в условиях
    function renderContent() {
        const stateWorkspace = queryState(query, {
            isEmpty: data => !data,
            emptyMessage: "Workspace not found",
        });

        if (stateWorkspace) {
            return stateWorkspace;
        }
        if (!query.data) return null;
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
                    <h2>Your Workspaces</h2>
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
