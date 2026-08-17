"use client";

import { useState } from "react";
import { Search } from "lucide-react"; // Assuming you are using lucide-react for the icon
import classes from "./SearchToggle.module.scss";
import Input from "@/components/ui/Input/Input";
import Button from "@/components/ui/Button/Button"; // Added the CSS Modules import

export default function SearchToggle() {
    const [isAppear, setIsAppear] = useState(false);

    function handleClickSearch() {
        setIsAppear(!isAppear);
    }

    return (
        <div className={classes.search}>
            {isAppear ? (
                <>
                    <Input
                        type={"search"}
                        className={classes["search__input"]}
                        variant={"search"}
                        placeholder={"search"}
                        autoFocus
                    />
                    <Button
                        type={"button"}
                        variant={"ghost"}
                        onClick={handleClickSearch}
                        className={classes["search__close"]}
                        aria-label={"search close"}
                    ></Button>
                </>
            ) : (
                <Button variant={"ghost"} onClick={handleClickSearch} className={classes["search__open"]}>
                    <Search size={16} />
                </Button>
            )}
        </div>
    );
}
