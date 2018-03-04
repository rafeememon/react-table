import {ExpandedTable} from '../../src';
import {GeoJsonFeatureProperties} from '../geojson';

export const FeatureTable = ExpandedTable.ofType<'code', GeoJsonFeatureProperties>();
