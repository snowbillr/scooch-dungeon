extends StaticBody2D

signal completed

onready var swipe_indicator = $SwipeIndicator

var player
var touching_direction = null

func _ready() -> void:
    SwipeDetector.connect("swiped", self, "_on_SwipeDetector_swiped")

func _on_PlayerDetector_body_entered(body: Node, from_direction: Vector2) -> void:
    if body == player:
        swipe_indicator.show_from_direction(from_direction)
        touching_direction = from_direction

func _on_PlayerDetector_body_exited(body: Node) -> void:
    swipe_indicator.hide_indicator()
    touching_direction = null

func _on_SwipeDetector_swiped(direction) -> void:
    if touching_direction == direction * Vector2(-1, -1):
        emit_signal("completed")
