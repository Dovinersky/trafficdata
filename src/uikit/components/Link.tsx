import { joinClasses } from "@/utils/classesJoiner";
import { Link as RouterLink } from "react-router-dom";
import "../styles/Link.scss";

type LinkProps = React.ComponentProps<typeof RouterLink>;

const Link = (props: LinkProps) => {
    return (
        <RouterLink
            {...props}
            className={joinClasses("uikit-link", props.className)}
        >
            {props.children}
        </RouterLink>
    );
};

export default Link;
