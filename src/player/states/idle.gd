extends FizzyState

func fizzy_enter(data) -> void:
    target.sprite.animation = "idle"
    target.sprite.playing = true
    target.movement_collision_shape.shape.extents = Vector2(16, 16)

    SwipeDetector.connect("swiped", self, "_on_SwipeDetector_swiped")

func _on_SwipeDetector_swiped(direction: Vector2) -> void:
    print("player starting to move")
    SwipeDetector.disconnect("swiped", self, "_on_SwipeDetector_swiped")
    fsm.transition_to("scooching", direction)
