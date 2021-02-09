extends StaticBody2D

export(NodePath) var player_path

onready var swipe_indicator = $SwipeIndicator

var player

func _ready() -> void:
    player = get_node(player_path)

func _on_PlayerDetector_body_exited(body: Node) -> void:
    swipe_indicator.hide_indicator()

func _on_PlayerDetector_body_entered(body: Node, from_direction: Vector2) -> void:
    if body == player:
        swipe_indicator.show_from_direction(from_direction)
