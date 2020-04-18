export class DungeonMarker {
  constructor(
    public readonly name: string,
    public readonly gridX: number,
    public readonly gridY: number,
    public readonly worldX: number,
    public readonly worldY: number,
  ) {}
}