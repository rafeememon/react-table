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
        this.handleScrollDebounced(event.currentTarget.scrollTop);
    }

    // tslint:disable-next-line:member-ordering
    private handleScrollDebounced = debounce((scrollTop: number) => {
        this.setState({scrollTop});
    }, HEADER_REPOSITION_DELAY_MS);

    private updateScroll() {
        const thead = ReactDOM.findDOMNode(this).querySelector('thead');
        if (thead) {
            thead.style.transform = `translateY(${this.state.scrollTop}px)`;
        }
    }

}
