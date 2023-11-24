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
import { Camera, CameraStatuses, TrafficObject } from "@/types/types";
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

type PreviewContentProps = {
    trafficObject: TrafficObject;
    selectedCameraId: number;
    onChange: (selectedCameraId: number) => void;
};

const OverallCameraAction = ({
    trafficObject,
    onClick,
}: OverallCameraActionProps) => {
    if (trafficObject.status == "unconfigured") return null;

    if (trafficObject.cameras.every((camera) => camera.status == "handle"))
        return (
            <Tooltip tooltip="Остановить все">
                <Button onClick={() => onClick("idle")}>
                    <Pause />
                </Button>
            </Tooltip>
        );
    return (
        <Tooltip tooltip="Запустить все">
            <Button onClick={() => onClick("handle")}>
                <Play />
            </Button>
        </Tooltip>
    );
};

const CameraAction = ({
    trafficObject,
    camera,
    onClick,
}: CameraActionProps) => {
    if (
        trafficObject.status == "unconfigured" ||
        trafficObject.cameras.length == 1
    )
        return <span />;

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
        <Tooltip tooltip={tooltipText} position="left">
            <Button onClick={() => onClick(newStatus, camera)}>
                <Icon />
            </Button>
        </Tooltip>
    );
};

const PreviewContent = ({
    trafficObject,
    selectedCameraId,
    onChange,
}: PreviewContentProps) => {
    if (trafficObject.status == "unconfigured")
        return <NoCamera className="traffic-card__no-camera" />;

    return (
        <>
            <img
                className="traffic-card__preview-picture"
                src={trafficObject.cameras[selectedCameraId].picture}
            />
            <div className="traffic-card__preview-selection">
                {trafficObject.cameras.length == 1
                    ? null
                    : trafficObject.cameras.map((camera) => (
                          <Button
                              key={camera.id}
                              className={
                                  selectedCameraId == camera.id ? "active" : ""
                              }
                              onClick={() => onChange(camera.id)}
                          >
                              {camera.id + 1}
                          </Button>
                      ))}
            </div>
        </>
    );
};

const TrafficCard = ({ data: initData }: TrafficCardProps) => {
    const [trafficObject, setTrafficObject] = useState(initData);
    const [selectedCameraId, setSelectedCameraId] = useState(0);

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

    const previewSelectorHandler = (selectedCameraId: number) => {
        setSelectedCameraId(selectedCameraId);
    };

    return (
        <div className="traffic-card__wrapper">
            <div className="traffic-card">
                <div className="traffic-card__header">
                    <Tooltip
                        tooltip={trafficObject.status}
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
                    <span className="traffic-card__place">
                        {trafficObject.name}
                    </span>
                    <Button className="traffic-card__settings">
                        <Settings />
                    </Button>
                </div>
                <div className="traffic-card__preview">
                    <PreviewContent
                        trafficObject={trafficObject}
                        selectedCameraId={selectedCameraId}
                        onChange={previewSelectorHandler}
                    />
                </div>
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
            </div>
        </div>
    );
};

export default TrafficCard;
