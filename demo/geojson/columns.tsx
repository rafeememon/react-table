import * as React from 'react';

import {Column} from '../../src';
import {GeoJsonFeatureProperties} from './types';

export const COLUMNS: Array<Column<GeoJsonFeatureProperties>> = [
    {
        label: 'Time',
        key: 'time',
        renderData({time}) {
            return new Date(time).toLocaleString();
        },
    },
    {
        label: 'Magnitude',
        key: 'mag',
    },
    {
        label: 'Location',
        key: 'place',
    },
    {
        label: 'Information',
        key: 'url',
        renderData({url}) {
            return <a href={url} target='_blank'>View more information</a>;
        },
    },
];
