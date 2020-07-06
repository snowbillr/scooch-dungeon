type TiledProperty = {
  name: string,
  value: string
}

type NormalizedProperties = {
  [key: string]: any;
}

export function normalize(properties: any): NormalizedProperties {
  // properties are in array format (e.g. tile properties)
  if (Array.isArray(properties)) {
    return (properties as TiledProperty[]).reduce((normalizedProperties: NormalizedProperties, property: TiledProperty) => {
      const { name, value } = property;
      normalizedProperties[name] = value;

      return normalizedProperties;
    }, {});
  }

  // properties are in hash format (e.g. map properties)
  const { name, value } = properties as TiledProperty;
  return {
    [name]: value
  };

}
