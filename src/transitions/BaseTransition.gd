extends Node2D
class_name BaseTransition

signal at_midpoint
signal finished

onready var overlay = $CanvasLayer/Overlay
onready var animation_player = $AnimationPlayer

func _ready() -> void:
    overlay.visible = false

func begin() -> void:
    pass

func finish() -> void:
    pass
