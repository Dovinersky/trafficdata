export type TrafficObject = {
    id: number;
    name: string;
    status: TrafficObjectStatuses;
    cameras: Array<Camera>;
};

export type Camera = {
    id: number;
    name: string;
    status: CameraStatuses;
    picture?: string;
};

export type TrafficObjectStatuses =
    | "active"
    | "inactive"
    | "unconfigured"
    | "error";

export type CameraStatuses = "handle" | "idle";
