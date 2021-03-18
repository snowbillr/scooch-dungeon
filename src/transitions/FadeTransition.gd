extends BaseTransition

func begin():
    animation_player.play("begin")
    yield(animation_player, "animation_finished")

    emit_signal("at_midpoint")

func finish():
    animation_player.play("finish")
    yield(animation_player, "animation_finished")

    emit_signal("finished")
