extends Node2D

signal player_detected_from
signal player_detected
signal player_lost

func _on_PlayerDetector_body_entered(body: Node, from_direction: Vector2) -> void:
	if body.is_in_group("player"):
		emit_signal("player_detected", body)
		emit_signal("player_detected_from", body, from_direction)

func _on_PlayerDetector_body_exited(body: Node) -> void:
	emit_signal("player_lost")
