import { joinClasses } from "@/utils/classesJoiner";
import "../styles/TextInput.scss";

type TextInputProps = React.ComponentProps<"input"> & {
    inputPrefix?: React.ReactNode;
    inputSuffix?: React.ReactNode;
};

const TextInput = ({ inputPrefix, inputSuffix, ...props }: TextInputProps) => {
    return (
        <span className="uikit-text-input-wrapper">
            {inputPrefix && (
                <span className="uikit-text-input__prefix">{inputPrefix}</span>
            )}
            <input
                {...props}
                type="text"
                className={joinClasses("uikit-text-input", props.className)}
            />
            {inputSuffix && (
                <span className="uikit-text-input__suffix">{inputSuffix}</span>
            )}
        </span>
    );
};

export default TextInput;
