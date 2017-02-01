
export const convertToStarsArr = stars => {
    let num = stars.toString().substring(0, 1);
    num--;
    let arr = [];
    // const reg = new RegExp(`0{${length}}`);
    for (let i = 0; i < 5; i++) {
        i <= num ?
            arr.push(1) :
            arr.push(0);
    }
    return arr;
}