interface girlfriend {
    a: string;
    b: number;
    boyfriend?: "Ivelin" | "Pesho";
}

let obj: girlfriend = { a: "asd", b: 1, boyfriend: "Ivelin"}

let func = (): girlfriend => {
    return obj;
};
let {a, b, boyfriend }: girlfriend = func();