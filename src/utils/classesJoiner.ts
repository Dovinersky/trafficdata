export const joinClasses = (...args: Array<string | undefined>) => {
    let result = "";
    args.forEach((arg) => {
        if (arg) {
            if (result) result += ` ${arg}`;
            else result = arg;
        }
    });
    return result;
};
// export const joinClasses = (
//     separator: string,
//     ...args: Array<string | undefined>
// ) => {
//     let result = "";
//     args.forEach((arg) => {
//         if (arg) {
//             if (result) result += `${separator}${arg}`;
//             else result = arg;
//         }
//     });
//     return result;
// };
