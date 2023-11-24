import { joinClasses } from "@/utils/classesJoiner";
import { useState } from "react";
import "../styles/ButtonsGroup.scss";
import Button from "./Button";

type ButtonsGroupProps = {
    className?: string;
    onChange?: (selectedIndex: number) => void;
    buttonsContent?: React.ReactNode[];
};

const ButtonsGroup = ({
    className,
    buttonsContent,
    onChange,
}: ButtonsGroupProps) => {
    const [activeIndex, setActiveIndex] = useState(4);
    const onButtonClickHandler = (value: number) => {
        setActiveIndex(value);
        if (onChange) onChange(value);
    };

    return (
        <div className={joinClasses("uikit-buttons-group", className)}>
            {buttonsContent?.map((content, index) => (
                <Button
                    key={index}
                    className={index == activeIndex ? "active" : ""}
                    onClick={() => {
                        onButtonClickHandler(index);
                    }}
                >
                    {content}
                </Button>
            ))}
        </div>
    );
};

export default ButtonsGroup;
