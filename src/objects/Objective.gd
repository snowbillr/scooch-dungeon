extends StaticBody2D

signal completed

onready var swipe_indicator = $SwipeIndicator

var player
var touching_direction = null

func _input(event):
    if event is InputSwipeEvent:
        if touching_direction == event.direction * Vector2(-1, -1):
            emit_signal("completed")

func _on_PlayerDetector_player_detected_from(from_direction) -> void:
    swipe_indicator.show_from_direction(from_direction)
    touching_direction = from_direction

func _on_PlayerDetector_player_lost() -> void:
    swipe_indicator.hide_indicator()
    touching_direction = null

