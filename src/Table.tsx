import findIndex from 'lodash-es/findIndex';
import sortBy from 'lodash-es/sortBy';
import * as React from 'react';

import {KeyValWithType} from './util';

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

export interface TableProps<
    Key extends keyof RowType,
    RowType extends KeyValWithType<Key, RowType[Key]>,
> {
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
    anchorKey: RowType[Key];
}

export class Table<
    Key extends keyof RowType,
    RowType extends KeyValWithType<Key, RowType[Key]>
> extends React.Component<TableProps<Key, RowType>, TableState<Key, RowType>> {

    public static ofType<
            Key extends keyof RowType,
            RowType extends KeyValWithType<Key, RowType[Key]>
        >() {
        return (Table as any) as new () => Table<Key, RowType>;
    }

    public state: TableState<Key, RowType> = {
        sort: null,
        sortedRows: this.props.rows,
        anchorKey: null,
    };

    public componentDidUpdate(
            {rows, selected}: TableProps<Key, RowType>,
            {sort, sortedRows}: TableState<Key, RowType>) {
        if (rows !== this.props.rows || sort !== this.state.sort) {
            this.sortRows();
        }
    }

    public render() {
        return <table className={this.props.className}>
            <thead>
                <tr>
                    {this.renderHeaders()}
                </tr>
            </thead>
            <tbody>
                {this.renderRows()}
            </tbody>
        </table>;
    }

    private renderHeaders() {
        return this.props.columns.map((column, columnIndex) => {
            return <th
                key={columnIndex}
                data-key={column.key}
                data-column={columnIndex}
                onClick={this.handleClickHeader}
            >
                {column.label}
                {this.renderHeaderSortIndicator(columnIndex)}
            </th>;
        });
    }

    private renderHeaderSortIndicator(columnIndex: number) {
        const {sort} = this.state;
        const style = sort && sort.index === columnIndex ? {} : {visibility: 'hidden'};
        const icon = sort && sort.direction === 'ASC' ? ' ▲' : ' ▼';
        return <span style={style}>{icon}</span>;
    }

    private renderRows() {
        const {keyField, selectedRowClassName, rowClassName} = this.props;
        return this.state.sortedRows.map((row, rowIndex) => {
            const keyValue = row[keyField];
            const selected = this.isSelected(keyValue);
            const selectedClassName = selected && selectedRowClassName || '';
            const customClassName = rowClassName ? rowClassName(keyValue) : '';
            return <tr
                key={rowIndex}
                data-row={rowIndex}
                data-selected={selected}
                className={`${selectedClassName} ${customClassName}`}
                onClick={this.handleClickRow}
            >
                {this.renderColumns(row)}
            </tr>;
        });
    }

    private renderColumns(row: RowType) {
        return this.props.columns.map((column, columnIndex) => {
            return <td
                key={columnIndex}
                data-key={column.key}
            >
                {this.renderCell(row, columnIndex)}
            </td>;
        });
    }

    private renderCell(row: RowType, columnIndex: number) {
        const column = this.props.columns[columnIndex];
        if (column.renderData) {
            return column.renderData(row);
        } else {
            return this.getCellData(row, columnIndex);
        }
    }

    private sortRows() {
        this.setState({sortedRows: this.getSortedRows()});
    }

    private getSortedRows() {
        const {rows} = this.props;
        const {sort} = this.state;
        if (sort) {
            const {index, direction} = sort;
            const ascending = sortBy(rows, row => this.getSortData(row, index));
            return direction === 'DESC' ? ascending.reverse() : ascending;
        } else {
            return rows;
        }
    }

    private getSortData(row: RowType, columnIndex: number) {
        const column = this.props.columns[columnIndex];
        if (column.getSortValue) {
            return column.getSortValue(row);
        } else if (column.getData) {
            return column.getData(row);
        } else {
            return row[column.key];
        }
    }

    private getCellData(row: RowType, columnIndex: number) {
        const column = this.props.columns[columnIndex];
        if (column.getData) {
            return column.getData(row);
        } else {
            const data = row[column.key];
            return data != null ? String(data) : '';
        }
    }

    private handleClickHeader = (event: React.MouseEvent<HTMLElement>) => {
        const index = +event.currentTarget.getAttribute('data-column')!;
        const {sort} = this.state;
        const direction = sort && sort.index === index
            ? (sort.direction === 'ASC' ? 'DESC' : 'ASC')
            : 'ASC';
        this.setState({sort: {index, direction}});
    }

    private handleClickRow = (event: React.MouseEvent<HTMLElement>) => {
        const index = +event.currentTarget.getAttribute('data-row')!;
        const keyValue = this.state.sortedRows[index][this.props.keyField];
        if (event.getModifierState('Shift')) {
            this.handleShiftClickRow(index, keyValue);
        } else if (event.getModifierState('Control')) {
            this.handleControlClickRow(index, keyValue);
        } else {
            this.handleNormalClickRow(index, keyValue);
        }
    }

    private handleShiftClickRow(index: number, keyValue: RowType[Key]) {
        const {anchorKey} = this.state;
        if (anchorKey != null) {
            const {keyField} = this.props;
            const otherIndex = findIndex(this.state.sortedRows, r => r[keyField] === anchorKey);
            if (otherIndex !== -1) {
                const newSelected = this.state.sortedRows
                    .slice(Math.min(index, otherIndex), Math.max(index, otherIndex) + 1)
                    .map(row => row[keyField]);
                this.select(newSelected);
            } else {
                this.handleNormalClickRow(index, keyValue);
            }
        } else {
            this.handleNormalClickRow(index, keyValue);
        }
    }

    private handleControlClickRow(index: number, keyValue: RowType[Key]) {
        const selected = this.props.selected || [];
        this.setState({anchorKey: keyValue});
        if (this.isSelected(keyValue)) {
            this.select(selected.filter(s => s !== keyValue));
        } else {
            this.select([...selected, keyValue]);
        }
    }

    private handleNormalClickRow(index: number, keyValue: RowType[Key]) {
        this.setState({anchorKey: keyValue});
        this.select([keyValue]);
    }

    private isSelected(keyValue: RowType[Key]) {
        return this.props.selected && this.props.selected.some(s => s === keyValue);
    }

    private select(keys: Array<RowType[Key]>) {
        if (this.props.onSelect) {
            this.props.onSelect(keys);
        }
    }

}
