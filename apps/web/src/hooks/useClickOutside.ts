import { RefObject, useEffect } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement | null>, onOutsideClick: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as Node;
            if (!ref.current?.contains(target)) {
                onOutsideClick();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onOutsideClick, ref]);
}
