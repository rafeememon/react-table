import * as React from 'react';

import {COLUMNS, GeoJsonFeatureProperties, getEarthquakes} from '../geojson';
import {FeatureTable} from './FeatureTable';

import './expandedTableDemo.scss';

export interface State {
    features: GeoJsonFeatureProperties[];
}

export class ExpandedTableDemo extends React.Component<{}, State> {

    public state: State = {
        features: [],
    };

    public componentWillMount() {
        getEarthquakes().then(response => {
            const features = response.features.map(f => f.properties);
            this.setState({features});
        });
    }

    public render() {
        return <div className='full-page-demo'>
            <div className='full-page-demo__header'>
                <h1>All earthquakes in the past day</h1>
            </div>
            <div className='full-page-demo__content'>
                <FeatureTable
                    keyField='code'
                    rows={this.state.features}
                    columns={COLUMNS}
                    noRowsElement={this.renderNoRowsElement()}
                />
            </div>
        </div>;
    }

    private renderNoRowsElement() {
        return <div className='no-rows'>
            Loading data...
        </div>;
    }

}
