import {Table} from '../../src';
import {GeoJsonFeatureProperties} from '../geojson';

export const FeatureTable = Table.ofType<'code', GeoJsonFeatureProperties>();
