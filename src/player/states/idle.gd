extends FizzyState

func fizzy_enter(data) -> void:
    target.sprite.animation = "idle"
    target.sprite.playing = true
    target.movement_collision_shape.shape.extents = Vector2(16, 16)

func fizzy_input(event) -> void:
    if event is InputSwipeEvent:
        print("player got swipe")
        fsm.transition_to("scooching", event.direction)
