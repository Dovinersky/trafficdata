import { joinClasses } from "@/utils/classesJoiner";
import "../styles/TextInput.scss";

type TextInputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

const TextInput = (props: TextInputProps) => {
    return (
        <input
            {...props}
            type="text"
            className={joinClasses("uikit-text-input", props.className)}
        />
    );
};

export default TextInput;
