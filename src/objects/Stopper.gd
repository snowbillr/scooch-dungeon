extends Node2D

onready var player_detector = $PlayerDetector

# Comes from $Player/FSM/scooching but will need to be put in a 'stats' resource somewhere
var speed = 200.0

func _ready():
	player_detector.connect("player_detected", self, "_on_PlayerDetector_player_detected")

func _on_PlayerDetector_player_detected():
	player_detector.disconnect("player_detected", self, "_on_PlayerDetector_player_detected")
	
	var player = get_tree().get_nodes_in_group("player")[0]
	var duration = global_position.distance_to(player.global_position) / speed;
	
	print("stopping")
	
	player.fsm.transition_to("idle", {})
	$Tween.interpolate_property(player, "global_position", player.global_position, global_position, duration)
	$Tween.start()
	yield($Tween, "tween_completed")
	player_detector.connect("player_detected", self, "_on_PlayerDetector_player_detected")
	
