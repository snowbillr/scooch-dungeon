extends Node2D

onready var fsm: FizzyMachine = $FizzyMachine
onready var sprite: AnimatedSprite = $AnimatedSprite
onready var movement_collision_shape: CollisionShape2D = $MovementCollisionShape
