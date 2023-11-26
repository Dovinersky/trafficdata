export const debounce = (callback: Function, delay: number) => {
    let timeoutId: number;
    return function (...args: Array<unknown>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), delay);
        return timeoutId;
    };
};
