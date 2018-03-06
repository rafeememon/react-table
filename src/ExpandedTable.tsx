import {debounce} from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import {Table, TableProps} from './Table';
import {KeyValWithType} from './util';

export interface ExpandedTableProps<
    Key extends keyof RowType,
    RowType extends KeyValWithType<Key, RowType[Key]>,
> extends TableProps<Key, RowType> {
    noRowsElement?: React.ReactNode;
}

export interface State {
    scrollTop: number;
}

const HEADER_REPOSITION_DELAY_MS = 50;

export class ExpandedTable<
    Key extends keyof RowType,
    RowType extends KeyValWithType<Key, RowType[Key]>
> extends React.Component<ExpandedTableProps<Key, RowType>, State> {

    public static ofType<
            Key extends keyof RowType,
            RowType extends KeyValWithType<Key, RowType[Key]>
        >() {
        return (ExpandedTable as any) as new () => ExpandedTable<Key, RowType>;
    }

    public state: State = {
        scrollTop: 0,
    };

    private theadElement: HTMLTableSectionElement | null = null;

    public componentDidMount() {
        this.theadElement = ReactDOM.findDOMNode(this).querySelector('thead');
    }

    public componentDidUpdate({}: any, {scrollTop}: State) {
        if (scrollTop !== this.state.scrollTop) {
            this.updateScroll();
        }
    }

    public render() {
        return <div className='expanded-table-container' onScroll={this.handleScroll}>
            <Table {...this.props} />
            {this.renderNoRows()}
        </div>;
    }

    private renderNoRows = () => {
        return this.props.rows.length === 0 ? this.props.noRowsElement : null;
    }

    private handleScroll = (event: React.UIEvent<HTMLElement>) => {
        this.hideTableHeader();
        this.handleScrollDebounced(event.currentTarget.scrollTop);
    }

    private hideTableHeader() {
        if (this.theadElement) {
            this.theadElement.style.visibility = 'hidden';
        }
    }

    // tslint:disable-next-line:member-ordering
    private handleScrollDebounced = debounce((scrollTop: number) => {
        this.setState({scrollTop});
    }, HEADER_REPOSITION_DELAY_MS);

    private updateScroll() {
        if (this.theadElement) {
            this.theadElement.style.transform = `translateY(${this.state.scrollTop}px)`;
            this.theadElement.style.visibility = 'visible';
        }
    }

}
