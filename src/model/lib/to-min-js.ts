import {Set} from "immutable";

export default function toMinJS(src, base, Base, exclude?:Set<string>) {
    
    const d = base || Base.create();
    const e = exclude || Set<string>();
    let json = {};
    src.forEach((value, key) => {
        // 除外対象の場合
        if (e.has(key)){
            return;
        }
        const dValue = d.get(key);
        if ((value) && (value.toMinJS)) {
            const minJS = value.toMinJS(dValue);
            if (Object.keys(minJS).length) {
                json[key] = minJS;
            }
            return;
        }
        if (dValue !== value) {
            json[key] = value;
        }
    });
    return json;
};
