extends Node2D

# Expects children:
# - TileMap
# - PlayerStart (Position2D)
# - Player
# - SwipeDetector

onready var tilemap = $TileMap
onready var player_start = $PlayerStart
onready var player = $Player

func _ready() -> void:
    var start_position = tilemap.world_to_map(player_start.position)
    player.position = tilemap.map_to_world(start_position) + tilemap.cell_size / 2


func _on_SwipeDetector_swiped(direction: Vector2) -> void:
    if player.fsm.current_state.name == "idle":
        player.fsm.transition_to("scooching", direction)
