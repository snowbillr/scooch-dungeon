extends Node2D

signal level_selected

func _on_Button_pressed() -> void:
	emit_signal("level_selected", "00")
