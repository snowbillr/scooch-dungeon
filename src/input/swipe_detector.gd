extends Node

class_name SwipeDetector

signal swiped

const MOVEMENT_THRESHOLD = 100

var movement_started = false
var total_movement = Vector2.ZERO

func _unhandled_input(event: InputEvent) -> void:
    if event is InputEventMouseButton:
        movement_started = event.is_pressed()
        total_movement = Vector2.ZERO

    if movement_started and event is InputEventMouseMotion:
        total_movement += event.relative
        if total_movement.x >= MOVEMENT_THRESHOLD:
            emit_signal("swiped", Vector2.RIGHT)
            movement_started = false
        if total_movement.x <= -MOVEMENT_THRESHOLD:
            emit_signal("swiped", Vector2.LEFT)
            movement_started = false
        if total_movement.y >= MOVEMENT_THRESHOLD:
            emit_signal("swiped", Vector2.DOWN)
            movement_started = false
        if total_movement.y <= -MOVEMENT_THRESHOLD:
            emit_signal("swiped", Vector2.UP)
            movement_started = false
