# https://godotengine.org/qa/12876/changing-radius-collision-shape-makes-collision-shapes-change
# Because we are using a custom length for the ray shape,
# we need to set a custom RayShape2D for the Area2D instead
# of using the one configured in the editor. This is because
# what is seen in the editor, the CollisionShape2D, is editor-only
# and is used to create a CollisionObject2D under the hood.
# The editor-only shape is pooled and whatever we set its length
# to last via code is set for everywhere the PlayerDetector is used.
# By using new shapes created in the code, we respect the `distance`
# value set in the editor for each instance of the PlayerDetector.

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
