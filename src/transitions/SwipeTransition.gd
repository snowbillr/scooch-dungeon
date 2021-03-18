extends BaseTransition

var direction: Vector2 setget _assign_prefix_from_direction
var animation_prefix = ""

func begin():
    overlay.visible = true

    animation_player.play("%s-begin" % animation_prefix)
    yield(animation_player, "animation_finished")

    emit_signal("at_midpoint")

func finish():
    animation_player.play("%s-finish" % animation_prefix)
    yield(animation_player, "animation_finished")

    overlay.visible = false
    emit_signal("finished")

func _assign_prefix_from_direction(direction: Vector2):
    match direction:
        Vector2.RIGHT:
            animation_prefix = "right"
        Vector2.LEFT:
            animation_prefix = "left"
        Vector2.UP:
            animation_prefix = "up"
        Vector2.DOWN:
            animation_prefix = "down"
