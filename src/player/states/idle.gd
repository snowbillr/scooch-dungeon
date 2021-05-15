extends FizzyState

func fizzy_enter(data) -> void:
	target.sprite.animation = "idle"
	target.sprite.playing = true
	target.movement_collision_shape.shape.extents = Vector2(16, 16)

	if data.has("direction"):
		match data.direction:
			Vector2.LEFT:
				target.sprite.flip_h = true
			Vector2.RIGHT:
				target.sprite.flip_h = false

func fizzy_input(event) -> void:
	if event is InputSwipeEvent:
		fsm.transition_to("scooching", event.direction)
