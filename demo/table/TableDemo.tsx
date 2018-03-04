import * as React from 'react';

import {COLUMNS, GeoJsonFeatureProperties, getEarthquakes} from '../geojson';
import {FeatureTable} from './FeatureTable';

export interface State {
    features: GeoJsonFeatureProperties[];
}

export class TableDemo extends React.Component<{}, State> {

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
        return <>
            <h1>All earthquakes in the past day</h1>
            {this.renderContent()}
        </>;
    }

    private renderContent() {
        if (this.state.features.length > 0) {
            return <FeatureTable
                keyField='code'
                rows={this.state.features}
                columns={COLUMNS}
            />;
        } else {
            return <div className='no-rows'>
                Loading data...
            </div>;
        }
    }

}
