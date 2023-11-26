import {
    Camera,
    CameraStatuses,
    TrafficObject,
    TrafficObjectStatuses,
} from "@/types/types";

// Generator options
const TRAFFIC_OBJECTS_REQUIRED = 50;
const CAMERAS_PER_OBJECT_MIN_REQUIRED = 1;
const CAMERAS_PER_OBJECT_MAX_REQUIRED = 6; // including

// Useful functions
const getRandomInteger = (max: number) => {
    return Math.floor(Math.random() * max);
};

const getRandomArrayElement = <T>(array: Array<T>) =>
    array[getRandomInteger(array.length)];

const getIDProvider = (firstId: number = 0) => {
    let id = firstId;
    return () => id++;
};

// Data tokens
const CAMERA_PICTURE_URLS = [
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IGUamoKqDPpoWE_OEHNCCAHaFj%26pid%3DApi&f=1&ipt=bdc892e87ab47a09a698e451c8e0c3ef3d1d5eb91bd5edce5f59578b3c71b390&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cEN3YVIvrI7EALaNZc-IvwHaE7%26pid%3DApi&f=1&ipt=6c2f473f962fe62a6b47a588434bb68b66bbfabc29daf4b32873deb0ec981595&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Qx39mzv1ziPV-LztjHX-2AHaE6%26pid%3DApi&f=1&ipt=6064a3b24617b8b5562455decebb71538f4633ebb86a101073c201dc3df4dab2&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.r0iYnZZaldHB2hFNOlKG3QHaEL%26pid%3DApi&f=1&ipt=6da5265e374d8298a94ba59fb3586830e8fe7325076b663d41737a5c5e5872fd&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.RkgIQx1mARIb_dDki_pCmwHaFA%26pid%3DApi&f=1&ipt=555d229d1ff42d939063004627ced6cccfccc6b905340232891ed502411b3084&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.MkJgPyCE7jNMxLurgg8mlwHaEx%26pid%3DApi&f=1&ipt=d4f9b803e853cfeaf6ce8e0223b9ac124d0a753facefee8c7af1b9685e158414&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.d7oeq9NG2oYvbFABrWtCxwHaE7%26pid%3DApi&f=1&ipt=791222077135d3196a3f982882353f7612bb54b1de9af742d700179f85f31005&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.dQYykNWHKgMfGwYZrbmMugHaE6%26pid%3DApi&f=1&ipt=921d8b7a54a68d7fdd134c6638e860610f193f89fcfcc3b4e99e425a35e8debb&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.6arPF-PbqVW5KEBomb-G1gHaE8%26pid%3DApi&f=1&ipt=15d26392bbfe1e0f15cac51ca323873b589d0881295fa56f77ce1f42fc8710f8&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.3ZykbUaftlKcQG44QzOIIAHaEK%26pid%3DApi&f=1&ipt=d30be5ead07520bbe111ebc1463a782eca21c39996927edf94cb5a556510299b&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.ifkOM9pTLU_BykWxA6bJsAHaEK%26pid%3DApi&f=1&ipt=799757ecc79ef1e0d70db4f78bb860052694b07317f7e4c2868bb0588f1ce2ca&ipo=images",
];

const TRAFFIC_OBJECTS = [
    "ул. Стахановская",
    "ул. Подлесная",
    "ул. Чкалова",
    "ул. Куйбышева",
    "ул. Архитектора Свиязева",
    "ул. Героев Хасана",
    "ул. Мира",
    "ул. Космонавта Леонова",
    "ул. Карпинского",
    "ул. Василия Васильева",
    "ул. Екатерининская",
    "ул. Ленина",
    "ул. Окулова",
    "ул. Монастырская",
    "ул. Дзержинского",
    "ул. Луначарского",
    "ул. Революции",
    "ул. Крупской",
    "ул. Тургенева",
    "ул. Уинская",
    "ул. Южная Дамба",
    "ул. Северная Дамба",
    "ул. Уральская",
    "ул. КИМ",
    "ул. Якова Свердлова",
    "ул. Ивановская",
    "ул. Лифанова",
    "ул. Фокинская",
    "ул. Старцева",
    "ул. Грибоедова",
    "б-р Гагарина",
    "ш. Космонавтов",
    "Бродовский тракт",
    "Коммунальный мост",
];

const TRAFFIC_OBJECT_STATUSES: Array<TrafficObjectStatuses> = [
    "active",
    "inactive",
    "unconfigured",
    "error",
];

const CAMERA_STATUSES: Array<CameraStatuses> = ["handle", "idle"];

// Generator functions
const getRandomCamera = (id: number): Camera => {
    const camera: Camera = {
        id,
        name: `Камера ${id + 1}`,
        status: getRandomArrayElement(CAMERA_STATUSES),
    };

    // Chance 1 of 5 the camera does not have picture
    if (getRandomInteger(5) < 4) {
        camera.picture = getRandomArrayElement(CAMERA_PICTURE_URLS);
    }

    return camera;
};

const getRandomCamerasArray = (min: number, max: number): Array<Camera> => {
    const getCameraId = getIDProvider();
    const camerasCount = getRandomInteger(max - min + 1) + min;

    return Array.from({ length: camerasCount }, () =>
        getRandomCamera(getCameraId())
    );
};

// Special objects (hand made data, before generated)
const getSpecialTrafficObjectId = getIDProvider();

const specials: Array<TrafficObject> = [
    // Every camera idle
    {
        id: getSpecialTrafficObjectId(),
        name: `${getRandomArrayElement(TRAFFIC_OBJECTS)}`,
        status: "active",
        cameras: getRandomCamerasArray(3, 3).map((camera) => {
            camera.status = "idle";
            return camera;
        }),
    },
    // Every camera handle
    {
        id: getSpecialTrafficObjectId(),
        name: `${getRandomArrayElement(TRAFFIC_OBJECTS)}`,
        status: "active",
        cameras: getRandomCamerasArray(3, 3).map((camera) => {
            camera.status = "handle";
            return camera;
        }),
    },
    // Many cameras idle
    {
        id: getSpecialTrafficObjectId(),
        name: `${getRandomArrayElement(TRAFFIC_OBJECTS)}`,
        status: "active",
        cameras: getRandomCamerasArray(3, 3).map((camera, index) => {
            if (index == 0) camera.status = "handle";
            else camera.status = "idle";
            return camera;
        }),
    },
    // Many cameras handle
    {
        id: getSpecialTrafficObjectId(),
        name: `${getRandomArrayElement(TRAFFIC_OBJECTS)}`,
        status: "active",
        cameras: getRandomCamerasArray(3, 3).map((camera, index) => {
            if (index == 0) camera.status = "idle";
            else camera.status = "handle";
            return camera;
        }),
    },
];

const generateData = (): Array<TrafficObject> => {
    const getGeneratedTrafficObjectId = getIDProvider(
        getSpecialTrafficObjectId()
    );

    const generated = Array.from({ length: TRAFFIC_OBJECTS_REQUIRED }, () => {
        const trafficObject: TrafficObject = {
            id: getGeneratedTrafficObjectId(),
            name: getRandomArrayElement(TRAFFIC_OBJECTS),
            status: getRandomArrayElement(TRAFFIC_OBJECT_STATUSES),
            cameras: getRandomCamerasArray(
                CAMERAS_PER_OBJECT_MIN_REQUIRED,
                CAMERAS_PER_OBJECT_MAX_REQUIRED
            ),
        };

        if (trafficObject.status == "unconfigured")
            trafficObject.cameras.forEach((camera) => (camera.status = "idle"));

        return trafficObject;
    });

    return specials.concat(generated);
    // return generated;
};

export default generateData;
