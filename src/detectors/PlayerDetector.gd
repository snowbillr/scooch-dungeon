extends Node2D

signal player_detected_from
signal player_detected
signal player_lost

export(int, 0, 100, 1) var distance = 1.0;

func _ready():
	var raycast_length = distance * 32.0
	if distance == 0:
		raycast_length = 8.0
	
	print("setting raycast distance to %s", raycast_length)
	
	# not working - seems that all playerdetectors are length 32, even after this runs
	$Left/CollisionShape2D.shape.set_length(raycast_length)
	$Up/CollisionShape2D.shape.set_length(raycast_length)
	$Right/CollisionShape2D.shape.set_length(raycast_length)
	$Down/CollisionShape2D.shape.set_length(raycast_length)

func _on_PlayerDetector_body_entered(body: Node, from_direction: Vector2) -> void:
	if body.is_in_group("player"):
		emit_signal("player_detected", body)
		emit_signal("player_detected_from", body, from_direction)

func _on_PlayerDetector_body_exited(body: Node) -> void:
	emit_signal("player_lost")
