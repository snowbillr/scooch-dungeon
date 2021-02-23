extends Node2D

signal level_set_selected

func _on_Button_pressed() -> void:
    emit_signal("level_set_selected", "00")
