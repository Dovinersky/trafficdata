import "@/styles/components/TrafficList.scss";
import { TrafficObject } from "@/types/types";
import TrafficCard from "./TrafficCard";

type TrafficListProps = {
    data: TrafficObject[];
};

const TrafficList = ({ data }: TrafficListProps) => {
    return (
        <div className="traffic-list">
            {data.map((item) => (
                <TrafficCard key={item.id} data={item} />
            ))}
        </div>
    );
};

export default TrafficList;
