extends Node2D

signal level_selected

func _on_Button_pressed(level_identifier) -> void:
	emit_signal("level_selected", level_identifier)


func _on_Button2_pressed(extra_arg_0):
	pass # Replace with function body.
