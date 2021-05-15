extends StaticBody2D

signal activated

onready var swipe_indicator = $SwipeIndicator
onready var animated_sprite = $AnimatedSprite

var touching_direction = null

func _input(event):
	if event is InputSwipeEvent:
		if touching_direction == event.direction * Vector2(-1, -1):
			swipe_indicator.hide()
			animated_sprite.play()
			yield(animated_sprite, "animation_finished")
			emit_signal("activated")

func _on_PlayerDetector_player_detected_from(player, from_direction) -> void:
	swipe_indicator.show_from_direction(from_direction)
	touching_direction = from_direction

func _on_PlayerDetector_player_lost() -> void:
	swipe_indicator.hide_indicator()
	touching_direction = null

