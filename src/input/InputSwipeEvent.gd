extends InputEventAction
class_name InputSwipeEvent

var direction: Vector2

func _init(_direction: Vector2) -> void:
    direction = _direction

func as_text() -> String:
    return "InputEventSwipe : direction=" + str(direction)
