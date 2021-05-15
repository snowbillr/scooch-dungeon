extends BaseTransition

var direction: Vector2 setget _assign_animation_prefix_from_direction
var animation_prefix: String

func _get_begin_animation_name() -> String:
	return "%s-begin" % animation_prefix

func _get_finish_animation_name() -> String:
	return "%s-finish" % animation_prefix

func _assign_animation_prefix_from_direction(direction: Vector2):
	match direction:
		Vector2.RIGHT:
			animation_prefix = "right"
		Vector2.LEFT:
			animation_prefix = "left"
		Vector2.UP:
			animation_prefix = "up"
		Vector2.DOWN:
			animation_prefix = "down"
