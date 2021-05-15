extends Node2D

signal level_selected

func _on_Button_pressed(level_identifier) -> void:
	emit_signal("level_selected", level_identifier)
