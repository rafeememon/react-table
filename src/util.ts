export type KeyValWithType<K extends string, V> = {
    [T in K]: V;
};
