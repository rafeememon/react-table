// More info at: https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

export interface GeoJsonMetadata {
    generated: number;
    url: string;
    title: string;
    api: string;
    count: number;
    status: number;
}

export interface GeoJsonFeatureProperties {
    mag: number;
    place: string;
    time: number;
    updated: number;
    tz: number;
    url: string;
    detail: string;
    felt: number;
    cdi: number;
    mmi: number;
    alert: string;
    status: string;
    tsunami: number;
    sig: number;
    net: string;
    code: string;
    ids: string;
    sources: string;
    types: string;
    nst: number;
    dmin: number;
    rms: number;
    gap: number;
    magType: string;
    type: string;
}

export interface GeoJsonFeature {
    properties: GeoJsonFeatureProperties;
}

export interface GeoJsonResponse {
    metadata: GeoJsonMetadata;
    features: GeoJsonFeature[];
}
