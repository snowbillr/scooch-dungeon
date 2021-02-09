extends Node2D

# Expects children:
# - TileMap
# - Player
# - SwipeDetector

onready var tilemap = $TileMap
onready var player = $Player

func _ready() -> void:
   SwipeDetector.connect("swiped", self, "_on_SwipeDetector_swiped")

func _on_SwipeDetector_swiped(direction: Vector2) -> void:
    if player.fsm.current_state.name == "idle":
        player.fsm.transition_to("scooching", direction)
