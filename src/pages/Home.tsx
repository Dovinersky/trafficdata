import TrafficCardsFilter, {
    FilterType,
} from "@/components/TrafficCardsFilter";
import TrafficList from "@/components/TrafficList";
import { DataContext } from "@/main";
import "@/styles/pages/Home.scss";
import { useContext, useState } from "react";

const Home = () => {
    const data = useContext(DataContext);
    const [filteredData, setFilteredData] = useState(data);

    const filterChangeHandler = (filter: FilterType) => {
        console.log(
            `query: ${filter.queryString}, status: ${filter.selectedStatus}`
        );

        const filteredByStatus =
            filter.selectedStatus == "all"
                ? data
                : data.filter((item) => item.status == filter.selectedStatus);

        setFilteredData(
            filteredByStatus.filter((item) =>
                item.name
                    .toLocaleLowerCase()
                    .includes(filter.queryString.toLocaleLowerCase())
            )
        );
    };

    return (
        <div className="home-page">
            <TrafficCardsFilter filterChanged={filterChangeHandler} />
            <TrafficList data={filteredData} />
        </div>
    );
};

export default Home;
