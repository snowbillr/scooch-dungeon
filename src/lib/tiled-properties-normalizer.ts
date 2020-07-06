type TiledProperty = {
  name: string,
  value: string
}

type NormalizedProperties = {
  [key: string]: any;
}

export function normalize(properties: any) {
  // properties are in hash format (e.g. map properties)
  if (typeof properties === 'object') {
    return properties;
  }

  // properties are in array format (e.g. tile properties)
  return (properties as TiledProperty[]).reduce((normalizedProperties: NormalizedProperties, property: TiledProperty) => {
    const { name, value } = property;
    normalizedProperties[name] = value;

    return normalizedProperties;
  }, {});
}
