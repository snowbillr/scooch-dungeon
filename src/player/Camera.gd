extends Camera2D

signal transition_halfway_finished

onready var AnimationPlayer = $AnimationPlayer
onready var transition_overlay = $icon

func limit_to_room(room):
    var tilemap = room.get_node("TileMap")
    var tilemap_rect: Rect2 = tilemap.get_used_rect()
    var tile_size: Vector2 = tilemap.cell_size

    limit_left = (tilemap_rect.position.x * tile_size.x) + room.position.x
    limit_top = (tilemap_rect.position.y * tile_size.y) + room.position.y
    limit_right = (tilemap_rect.end.x * tile_size.x) + room.position.x
    limit_bottom = (tilemap_rect.end.y * tile_size.y) + room.position.y
