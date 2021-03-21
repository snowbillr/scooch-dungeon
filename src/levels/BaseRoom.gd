extends Node2D
class_name Room

onready var map = $TileMap

func _ready() -> void:
    pass

func get_limits_for_camera():
    var map_rect: Rect2 = map.get_used_rect()

    return CameraLimit.new(
        position.x,
        position.x + map_rect.end.x,
        position.y,
        position.y + map_rect.end.y
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
