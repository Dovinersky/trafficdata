import { joinClasses } from "@/utils/classesJoiner";
import "../styles/TextInput.scss";

type TextInputProps = React.ComponentProps<"input">;

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
