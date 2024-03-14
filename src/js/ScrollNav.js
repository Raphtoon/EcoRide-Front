import { useEffect } from "react";

const ScrollNav = () => {
    useEffect(() => {
        const scrollChange = () => {
            const navTarget = document.querySelector("#navChange");
            if (window.scrollY > 10) {
                navTarget.classList.add("afterScroll");
            } else {
                navTarget.classList.remove("afterScroll");
            }
        };
        window.addEventListener('scroll', scrollChange);
        return () => {
            window.removeEventListener('scroll', scrollChange);
        };
    }, []);


};

export default ScrollNav;