extends Node2D

signal player_detected_from
signal player_detected
signal player_lost

export(int, 0.0, 100.0, 1.0) var distance = 1.0;

func _ready():
	var raycast_length = distance * 32.0
	if is_equal_approx(distance, 0.0):
		raycast_length = 8.0
	
	# not working
	# seems that all playerdetectors are length 32, even after this runs
	print($Left.get_shape_owners())
	
	# - making each shape unique - that may work - nope
	# IN PROGRESS - trying to set a custom shape on the area using a shape_owner
	
	# we may need to use a `shape_owner*` method on the collision object, i.e. the area2d
	var updated_shape := RayShape2D.new()
	updated_shape.length = raycast_length
	
#	var left_owner_id = $Left.get_shape_owners()[0]
#	$Left.shape_owner_clear_shapes(left_owner_id)
#	$Left.shape_owner_add_shape(left_owner_id, shape)
	_reset_area_shape($Left, updated_shape)
	_reset_area_shape($Up, updated_shape)
	_reset_area_shape($Right, updated_shape)
	_reset_area_shape($Down, updated_shape)
	
#	$Left/CollisionShape2D.shape_owner_get_shape().length = raycast_length
#	$Up/CollisionShape2D.shape_owner_get_shape().length = raycast_length
#	$Right/CollisionShape2D.shape_owner_get_shape().length = raycast_length
#	$Down/CollisionShape2D.shape_owner_get_shape().length = raycast_length

func _on_PlayerDetector_body_entered(body: Node, from_direction: Vector2) -> void:
	print("body detected")
	
	if body.is_in_group("player"):
		print("body is player")
		emit_signal("player_detected", body)
		emit_signal("player_detected_from", body, from_direction)
	else:
		print("body is not player")

func _on_PlayerDetector_body_exited(body: Node) -> void:
	emit_signal("player_lost")

func _reset_area_shape(area: Area2D, shape: Shape2D) -> void:
	var owner_id = area.get_shape_owners()[0]
	area.shape_owner_clear_shapes(owner_id)
	area.shape_owner_add_shape(owner_id, shape)
