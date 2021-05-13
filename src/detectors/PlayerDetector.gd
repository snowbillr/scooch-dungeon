extends Node2D

signal player_detected_from
signal player_detected
signal player_lost

export(int, 0, 64, 1) var distance := 1;

func _ready():
	var raycast_length = distance * 32
	if distance == 0:
		raycast_length = 8
	
	var updated_shape := RayShape2D.new()
	updated_shape.length = raycast_length
	
	_reset_area_shape($Left, updated_shape)
	_reset_area_shape($Up, updated_shape)
	_reset_area_shape($Right, updated_shape)
	_reset_area_shape($Down, updated_shape)
	
func _on_PlayerDetector_body_entered(body: Node, from_direction: Vector2) -> void:
	if body.is_in_group("player"):
		emit_signal("player_detected", body)
		emit_signal("player_detected_from", body, from_direction)

func _on_PlayerDetector_body_exited(body: Node) -> void:
	emit_signal("player_lost")

func _reset_area_shape(area: Area2D, shape: Shape2D) -> void:
	var owner_id = area.get_shape_owners()[0]
	area.shape_owner_clear_shapes(owner_id)
	area.shape_owner_add_shape(owner_id, shape)
