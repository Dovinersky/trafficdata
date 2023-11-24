import "@/styles/components/TrafficCardsFilter.scss";
import { Border, Error, Pause, Play, SettingsAlerted } from "@/svg/svghub";
import { TrafficObjectStatuses } from "@/types/types";
import ButtonsGroup from "@/uikit/components/ButtonsGroup";
import TextInput from "@/uikit/components/TextInput";
import { useState } from "react";
import Tooltip from "./Tooltip";

type TrafficCardFilterProps = {
    filterChanged?: (filter: FilterType) => void;
};

type StatusOptionsType = TrafficObjectStatuses | "all";

type FilterStatusType = {
    statusType: StatusOptionsType;
    tooltip: string;
    icon: JSX.Element;
};

export type FilterType = {
    queryString: string;
    selectedStatus: StatusOptionsType;
};

const statuses: Array<FilterStatusType> = [
    { statusType: "active", tooltip: "В обработке", icon: <Play /> },
    { statusType: "inactive", tooltip: "Не активны", icon: <Pause /> },
    { statusType: "error", tooltip: "Ошибка", icon: <Error /> },
    {
        statusType: "unconfigured",
        tooltip: "Не настроены",
        icon: <SettingsAlerted />,
    },
    { statusType: "all", tooltip: "Все", icon: <Border /> },
];

const TrafficCardsFilter = ({ filterChanged }: TrafficCardFilterProps) => {
    const [queryString, setQueryString] = useState("");
    const [selectedStatus, setSelectedStatus] =
        useState<StatusOptionsType>("all");

    const textInputChangeHandler = (value: string) => {
        setQueryString(value);
        if (filterChanged)
            filterChanged({
                queryString: value,
                selectedStatus,
            });
    };

    const statusSelectionChangeHandler = (value: StatusOptionsType) => {
        setSelectedStatus(value);
        if (filterChanged)
            filterChanged({ queryString, selectedStatus: value });
    };

    return (
        <div className="traffic-cards-filter">
            <TextInput
                value={queryString}
                onChange={(event) => {
                    textInputChangeHandler(event.currentTarget.value);
                }}
                placeholder="Поиск объекта"
            />
            <ButtonsGroup
                onChange={(selectedIndex) =>
                    statusSelectionChangeHandler(
                        statuses[selectedIndex].statusType
                    )
                }
                buttonsContent={statuses.map((status) => (
                    <Tooltip key={status.statusType} tooltip={status.tooltip}>
                        {status.icon}
                    </Tooltip>
                ))}
            />
        </div>
    );
};

export default TrafficCardsFilter;
