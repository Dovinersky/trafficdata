import "@/styles/components/Header.scss";
import { Analytics, BulletList, EventBusy, Table } from "@/svg/svghub";
import Link from "@/uikit/components/Link";
import { joinClasses } from "@/utils/classesJoiner";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const navbarRoutes = {
    home: { path: "/", icon: <BulletList /> },
    dashboards: { path: "/dashboards", icon: <Analytics /> },
    tables: { path: "/tables", icon: <Table /> },
    events: { path: "/events", icon: <EventBusy /> },
};

const Header = () => {
    const pathname = useLocation().pathname;

    return (
        <header className="header">
            <div className="header__logo-wrapper">
                <Logo />
            </div>
            <nav className="navbar">
                <ul className="navbar-list">
                    {Object.keys(navbarRoutes).map((routeKey) => {
                        const key = routeKey as keyof typeof navbarRoutes;
                        return (
                            <li
                                key={navbarRoutes[key].path}
                                className={joinClasses(
                                    "navbar-list__item",
                                    pathname == navbarRoutes[key].path
                                        ? "active"
                                        : undefined
                                )}
                            >
                                <Link
                                    className="navbar-list__link"
                                    to={navbarRoutes[key].path}
                                >
                                    {navbarRoutes[key].icon}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
