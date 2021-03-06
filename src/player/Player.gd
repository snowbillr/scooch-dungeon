extends Node2D
class_name Player

onready var fsm: FizzyMachine = $FizzyMachine
onready var sprite: AnimatedSprite = $AnimatedSprite
onready var movement_collision_shape: CollisionShape2D = $MovementCollisionShape
onready var camera: Camera2D = $Camera
onready var movement_trail: Particles2D = $MovementTrail

var speed := 200.0

func tween_to(global_destination: Vector2):
	if fsm.current_state.name == "tweening":
		return
	
	var duration = global_destination.distance_to(global_position) / speed;
	
	fsm.transition_to("tweening", { "duration": duration, "global_destination": global_destination })
