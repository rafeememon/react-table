export declare type KeyValWithType<K extends string | number | symbol, V> = {
    [T in K]: V;
};
