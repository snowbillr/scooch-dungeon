extends Node2D

# Expects children:
# - TileMap
# - Player
# - SwipeDetector

onready var tilemap = $TileMap
onready var player = $Player
var player_camera: PlayerCamera = null

func _ready() -> void:
    player_camera = PlayerCamera.new()
    player.add_child(player_camera)

func _on_SwipeDetector_swiped(direction: Vector2) -> void:
    if player.fsm.current_state.name == "idle":
        player.fsm.transition_to("scooching", direction)
