extends Node2D

onready var player_detector = $PlayerDetector

func _on_PlayerDetector_player_detected(player: Node):
	player.tween_to(global_position)
