extends Camera2D

class_name PlayerCamera

func _ready() -> void:
    current = true
    smoothing_enabled = true
    smoothing_speed = 10
