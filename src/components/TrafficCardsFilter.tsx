import "@/styles/components/TrafficCardsFilter.scss";
import {
    Border,
    Error,
    Pause,
    Play,
    Search,
    SettingsAlerted,
} from "@/svg/svghub";
import { TrafficObjectStatuses } from "@/types/types";
import ButtonsGroup from "@/uikit/components/ButtonsGroup";
import TextInput from "@/uikit/components/TextInput";
import { debounce } from "@/utils/debounce";
import { useCallback, useEffect, useReducer, useRef } from "react";
import Tooltip from "./Tooltip";

type TrafficCardFilterProps = {
    filterChanged: (filter: FilterType) => void;
};

type FilterStatusOptionsType = TrafficObjectStatuses | "all";

export type FilterType = {
    queryString: string;
    selectedStatus: FilterStatusOptionsType;
};

type FilterActions =
    | {
          type: "changeString";
          payload: string;
      }
    | { type: "changeStatus"; payload: FilterStatusOptionsType };

const statusButtonsData: Array<{
    statusType: FilterStatusOptionsType;
    tooltip: string;
    icon: JSX.Element;
}> = [
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
    const debouncedFilterChangedTimeoutId = useRef<number>(-1);
    const [filter, dispatchFilter] = useReducer<
        (state: FilterType, action: FilterActions) => FilterType
    >(
        (state, action) => {
            let newState: FilterType = { ...state };

            switch (action.type) {
                case "changeString":
                    newState.queryString = action.payload;
                    break;
                case "changeStatus":
                    newState.selectedStatus = action.payload;
                    break;
                default:
                    action satisfies never;
                    return state;
            }

            return newState;
        },
        {
            queryString: "",
            selectedStatus: "all",
        }
    );

    useEffect(() => {
        debouncedFilterChangedTimeoutId.current =
            debouncedFilterChanged(filter);
    }, [filter.queryString]);

    useEffect(() => {
        clearTimeout(debouncedFilterChangedTimeoutId.current);
        filterChanged(filter);
    }, [filter.selectedStatus]);

    const debouncedFilterChanged = useCallback(
        debounce(filterChanged, 300),
        []
    );

    return (
        <div className="traffic-cards-filter">
            <TextInput
                value={filter.queryString}
                onChange={(event) => {
                    dispatchFilter({
                        type: "changeString",
                        payload: event.currentTarget.value,
                    });
                }}
                placeholder="Поиск объекта"
                inputPrefix={<Search />}
            />
            <ButtonsGroup
                onChange={(selectedIndex) => {
                    dispatchFilter({
                        type: "changeStatus",
                        payload: statusButtonsData[selectedIndex].statusType,
                    });
                }}
                buttonsContent={statusButtonsData.map((data) => (
                    <Tooltip key={data.statusType} tooltip={data.tooltip}>
                        {data.icon}
                    </Tooltip>
                ))}
            />
        </div>
    );
};

export default TrafficCardsFilter;
