extends Node2D

signal at_midpoint
signal finished

onready var overlay = $CanvasLayer/Overlay
onready var animation_player = $AnimationPlayer

func _ready() -> void:
    overlay.visible = false

func begin():
    overlay.visible = true

    animation_player.play("right-begin")
    yield(animation_player, "animation_finished")

    emit_signal("at_midpoint")

func finish():
    animation_player.play("right-finish")
    yield(animation_player, "animation_finished")

    overlay.visible = false
    emit_signal("finished")
