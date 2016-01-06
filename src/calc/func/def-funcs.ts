const sum = function() {
    const args = Array.prototype.concat.apply([], arguments);
    let value = 0;
    for (var id in args) {
        value = value + Number(args[id]);
    }

    return value;
};

const avg = function() {
    const args = Array.prototype.concat.apply([], arguments);
    const sumValue = sum.apply(null, args);

    return sumValue / args.length;
}

// 参照用関数
const ref = function() {
    return "";
}


const funcList = {
    "SUM": sum,
    "AVG": avg,
    "REF": ref
};
export {
funcList
};
