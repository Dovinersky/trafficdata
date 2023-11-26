import "@/styles/components/TrafficCard.scss";
import {
    AnalyticsMini,
    Car,
    EventBusyMini,
    NoCamera,
    Pause,
    PauseMini,
    Play,
    PlayMini,
    Settings,
    TableMini,
} from "@/svg/svghub";
import {
    Camera,
    CameraStatuses,
    TrafficObject,
    TrafficObjectStatuses,
} from "@/types/types";
import Button from "@/uikit/components/Button";
import Link from "@/uikit/components/Link";
import { joinClasses } from "@/utils/classesJoiner";
import { FC, Fragment, useState } from "react";
import Tooltip from "./Tooltip";

type TrafficCardProps = {
    data: TrafficObject;
};

type OverallCameraActionProps = {
    trafficObject: TrafficObject;
    onClick: (newStatus: CameraStatuses) => void;
};

type CameraActionProps = {
    trafficObject: TrafficObject;
    camera: Camera;
    onClick: (newStatus: CameraStatuses, camera: Camera) => void;
};

type HeaderProps = {
    trafficObject: TrafficObject;
};

type PreviewProps = {
    trafficObject: TrafficObject;
};

type NavigationProps = {
    trafficObject: TrafficObject;
    overallCameraActionHandler: (newStatus: CameraStatuses) => void;
};

type CamerasProps = {
    trafficObject: TrafficObject;
    cameraActionHandler: (
        newStatus: CameraStatuses,
        targetCamera: Camera
    ) => void;
};

const trafficObjectStatusesLocalized: {
    [key in TrafficObjectStatuses]: string;
} = {
    active: "Активен",
    inactive: "Не активен",
    unconfigured: "Не настроен",
    error: "Ошибка",
};

const OverallCameraAction = ({
    trafficObject,
    onClick,
}: OverallCameraActionProps) => {
    let tooltipText: string = "Запустить все";
    let newStatus: CameraStatuses = "handle";
    let Icon: FC = Play;

    if (trafficObject.cameras.every((camera) => camera.status == "handle")) {
        tooltipText = "Остановить все";
        newStatus = "idle";
        Icon = Pause;
    }

    return (
        <Tooltip
            tooltip={tooltipText}
            inactive={trafficObject.status == "unconfigured"}
        >
            <Button
                className="camera-action-button"
                onClick={() => onClick(newStatus)}
                disabled={trafficObject.status == "unconfigured"}
            >
                <Icon />
            </Button>
        </Tooltip>
    );
};

const CameraAction = ({
    trafficObject,
    camera,
    onClick,
}: CameraActionProps) => {
    if (trafficObject.cameras.length == 1) return <span />;

    let Icon: FC;
    let tooltipText: string;
    let newStatus: CameraStatuses;

    if (camera.status == "handle") {
        Icon = PauseMini;
        tooltipText = "Остановить";
        newStatus = "idle";
    } else {
        Icon = PlayMini;
        tooltipText = "Запустить";
        newStatus = "handle";
    }

    return (
        <Tooltip
            tooltip={tooltipText}
            position="left"
            inactive={trafficObject.status == "unconfigured"}
        >
            <Button
                className="camera-action-button"
                onClick={() => onClick(newStatus, camera)}
                disabled={trafficObject.status == "unconfigured"}
            >
                <Icon />
            </Button>
        </Tooltip>
    );
};

const Header = ({ trafficObject }: HeaderProps) => {
    return (
        <div className="traffic-card__header">
            <Tooltip
                tooltip={trafficObjectStatusesLocalized[trafficObject.status]}
                position="right"
                className="traffic-card__status-wrapper"
            >
                <Car
                    className={joinClasses(
                        "traffic-card__status",
                        trafficObject.status
                    )}
                />
            </Tooltip>
            <span className="traffic-card__place">{trafficObject.name}</span>
            <Button className="traffic-card__settings">
                <Settings />
            </Button>
        </div>
    );
};

const Preview = ({ trafficObject }: PreviewProps) => {
    const [selectedCameraId, setSelectedCameraId] = useState(0);

    const Image = trafficObject.cameras[selectedCameraId].picture ? (
        <img
            className="traffic-card__preview-picture"
            src={trafficObject.cameras[selectedCameraId].picture}
        />
    ) : (
        <NoCamera className="traffic-card__no-camera" />
    );

    const Selection =
        trafficObject.cameras.length == 1
            ? null
            : trafficObject.cameras.map((camera) => (
                  <Button
                      key={camera.id}
                      className={selectedCameraId == camera.id ? "active" : ""}
                      onClick={() => setSelectedCameraId(camera.id)}
                  >
                      {camera.id + 1}
                  </Button>
              ));

    return (
        <div className="traffic-card__preview">
            {Image}
            <div className="traffic-card__preview-selection">{Selection}</div>
        </div>
    );
};

const Navigation = ({
    trafficObject,
    overallCameraActionHandler,
}: NavigationProps) => {
    return (
        <div className="traffic-card__navigation">
            <Tooltip tooltip="Дашборд">
                <Link to={`/dashboards?id=${trafficObject.id}`}>
                    <AnalyticsMini />
                </Link>
            </Tooltip>
            <Tooltip tooltip="Таблицы">
                <Link to={`/tables?id=${trafficObject.id}`}>
                    <TableMini />
                </Link>
            </Tooltip>
            <Tooltip tooltip="События">
                <Link to={`/events?id=${trafficObject.id}`}>
                    <EventBusyMini />
                </Link>
            </Tooltip>
            <OverallCameraAction
                trafficObject={trafficObject}
                onClick={overallCameraActionHandler}
            />
        </div>
    );
};

const Cameras = ({ trafficObject, cameraActionHandler }: CamerasProps) => {
    return (
        <div className="traffic-card__cameras">
            {trafficObject.cameras.map((camera) => (
                <Fragment key={camera.id}>
                    <span>{`${camera.name}`}</span>
                    <CameraAction
                        trafficObject={trafficObject}
                        camera={camera}
                        onClick={cameraActionHandler}
                    />
                </Fragment>
            ))}
        </div>
    );
};

const TrafficCard = ({ data: initData }: TrafficCardProps) => {
    const [trafficObject, setTrafficObject] = useState(initData);

    const overallCameraActionHandler = (newStatus: CameraStatuses) => {
        setTrafficObject({
            ...trafficObject,
            cameras: trafficObject.cameras.map((camera) => {
                camera.status = newStatus;
                return camera;
            }),
        });
    };

    const cameraActionHandler = (
        newStatus: CameraStatuses,
        targetCamera: Camera
    ) => {
        setTrafficObject({
            ...trafficObject,
            cameras: trafficObject.cameras.map((camera) => {
                if (camera.id == targetCamera.id) camera.status = newStatus;
                return camera;
            }),
        });
    };

    return (
        <div className="traffic-card__wrapper">
            <div className="traffic-card">
                <Header trafficObject={trafficObject} />
                <Preview trafficObject={trafficObject} />
                <Navigation
                    trafficObject={trafficObject}
                    overallCameraActionHandler={overallCameraActionHandler}
                />
                <Cameras
                    trafficObject={trafficObject}
                    cameraActionHandler={cameraActionHandler}
                />
            </div>
        </div>
    );
};

export default TrafficCard;
