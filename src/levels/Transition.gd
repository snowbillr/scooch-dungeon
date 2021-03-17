extends Node2D

signal at_midpoint
signal finished

onready var overlay = $CanvasLayer/Overlay
onready var animation_player = $AnimationPlayer

var animation_prefix = ""

func _ready() -> void:
    overlay.visible = false

func begin(direction: Vector2):
    _assign_prefix_from_direction(direction)
    overlay.visible = true

    animation_player.play("%s-begin" % animation_prefix)
    yield(animation_player, "animation_finished")

    emit_signal("at_midpoint")

func finish():
    animation_player.play("%s-finish" % animation_prefix)
    yield(animation_player, "animation_finished")

    overlay.visible = false
    emit_signal("finished")

func _assign_prefix_from_direction(direction: Vector2):
    match direction:
        Vector2.RIGHT:
            animation_prefix = "right"
        Vector2.LEFT:
            animation_prefix = "left"
        Vector2.UP:
            animation_prefix = "up"
        Vector2.DOWN:
            animation_prefix = "down"
