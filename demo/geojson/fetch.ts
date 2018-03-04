import {GeoJsonResponse} from './types';

const URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export function getEarthquakes(): Promise<GeoJsonResponse> {
    return fetch(URL).then(res => res.json());
}
