/// <reference types="react" />
import * as React from 'react';
import { TableProps } from './Table';
import { KeyValWithType } from './util';
export interface ExpandedTableProps<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>> extends TableProps<Key, RowType> {
    noRowsElement?: React.ReactNode;
}
export interface State {
    scrollTop: number;
}
export declare class ExpandedTable<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>> extends React.Component<ExpandedTableProps<Key, RowType>, State> {
    static ofType<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>>(): new () => ExpandedTable<Key, RowType>;
    state: State;
    componentDidUpdate({}: any, {scrollTop}: State): void;
    render(): JSX.Element;
    private renderNoRows;
    private handleScroll;
    private handleScrollDebounced;
    private updateScroll();
}
