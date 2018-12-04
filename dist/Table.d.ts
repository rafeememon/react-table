import * as React from 'react';
import { KeyValWithType } from './util';
export interface Column<T> {
    label: React.ReactNode;
    key: keyof T;
    getData?(row: T): string;
    getSortValue?(row: T): string | number;
    renderData?(row: T): React.ReactNode;
}
export interface TableSort {
    index: number;
    direction: 'ASC' | 'DESC';
}
export interface TableProps<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>> {
    keyField: Key;
    rows: RowType[];
    columns: Array<Column<RowType>>;
    selected?: Array<RowType[Key]>;
    className?: string;
    selectedRowClassName?: string;
    rowClassName?(key: RowType[Key]): string;
    onSelect?(keys: Array<RowType[Key]>): void;
}
export interface TableState<Key extends keyof RowType, RowType> {
    sort: TableSort | null;
    sortedRows: RowType[];
    anchorKey: RowType[Key] | null;
}
export declare class Table<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>> extends React.Component<TableProps<Key, RowType>, TableState<Key, RowType>> {
    static ofType<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>>(): new () => Table<Key, RowType>;
    state: TableState<Key, RowType>;
    componentDidUpdate({ rows, selected }: TableProps<Key, RowType>, { sort, sortedRows }: TableState<Key, RowType>): void;
    render(): JSX.Element;
    private renderHeaders;
    private renderHeaderSortIndicator;
    private renderRows;
    private renderColumns;
    private renderCell;
    private sortRows;
    private getSortedRows;
    private getSortData;
    private getCellData;
    private handleClickHeader;
    private handleClickRow;
    private handleShiftClickRow;
    private handleControlClickRow;
    private handleNormalClickRow;
    private isSelected;
    private select;
}
