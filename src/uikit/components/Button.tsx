import { joinClasses } from "@/utils/classesJoiner";
import "../styles/Button.scss";

type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

const Button = (props: ButtonProps) => {
    return (
        <button
            {...props}
            className={joinClasses("uikit-button", props.className)}
        >
            {props.children}
        </button>
    );
};

export default Button;
