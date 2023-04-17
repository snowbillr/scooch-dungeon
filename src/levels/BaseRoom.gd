extends Node2D
class_name BaseRoom

onready var map = $TileMap

func _ready() -> void:
	pass

func get_limits_for_camera():
	var map_rect: Rect2 = map.get_used_rect()
	var cell_size: Vector2 = map.cell_size

	return CameraLimit.new(
		position.x,
		position.x + (map_rect.end.x * cell_size.x),
		position.y,
		position.y + (map_rect.end.y * cell_size.y)
	)

class CameraLimit:
	var left
	var right
	var top
	var bottom

	func _init(_left, _right, _top, _bottom) -> void:
		left = _left
		right = _right
		top = _top
		bottom = _bottom
