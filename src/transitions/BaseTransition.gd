extends Node2D
class_name BaseTransition

signal at_midpoint
signal finished

onready var overlay = $CanvasLayer/Overlay
onready var animation_player = $AnimationPlayer

func _ready() -> void:
	overlay.visible = false

func begin() -> void:
	animation_player.play(_get_begin_animation_name())
	yield(animation_player, "animation_finished")

	emit_signal("at_midpoint")

func finish() -> void:
	animation_player.play(_get_finish_animation_name())
	yield(animation_player, "animation_finished")

	emit_signal("finished")

func _get_begin_animation_name() -> String:
	return "begin"

func _get_finish_animation_name() -> String:
	return "finish"
