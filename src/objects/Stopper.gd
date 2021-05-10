extends Node2D

onready var player_detector = $PlayerDetector

func _on_PlayerDetector_player_detected():
	var player = get_tree().get_nodes_in_group("player")[0]
	player.tween_to(global_position)
