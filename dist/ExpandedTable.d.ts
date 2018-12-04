/// <reference types="react" />
import * as React from 'react';
import { TableProps } from './Table';
import { KeyValWithType } from './util';
export interface ExpandedTableProps<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>> extends TableProps<Key, RowType> {
    noRowsElement?: React.ReactNode;
}
export declare class ExpandedTable<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>> extends React.Component<ExpandedTableProps<Key, RowType>> {
    static ofType<Key extends keyof RowType, RowType extends KeyValWithType<Key, RowType[Key]>>(): new () => ExpandedTable<Key, RowType>;
    private theadElement;
    componentDidMount(): void;
    render(): JSX.Element;
    private renderNoRows();
    private handleScroll;
    private hideTableHeader();
    private repositionTableHeader;
    private scrollSelectedIntoView();
}
