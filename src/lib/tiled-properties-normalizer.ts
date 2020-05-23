type TiledProperty = {
  name: string,
  value: string
}

type NormalizedProperties = {
  [key: string]: any;
}

// This parameter type is `object` because of the Phaser type definition
export function normalize(properties: object) {
  return (properties as TiledProperty[]).reduce((normalizedProperties: NormalizedProperties, property: TiledProperty) => {
    const { name, value } = property;
    normalizedProperties[name] = value;

    return normalizedProperties;
  }, {})
}
