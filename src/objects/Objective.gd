extends StaticBody2D

export(NodePath) var player_path

onready var swipe_indicator = $SwipeIndicator

var player

func _ready() -> void:
    player = get_node(player_path)

func _on_PlayerDetector_body_exited(body: Node) -> void:
    swipe_indicator.hide_indicator()

func _on_PlayerDetectorLeft_body_entered(body: Node) -> void:
    if body == player:
        swipe_indicator.show_for_direction(Vector2.RIGHT)

func _on_PlayerDetectorRight_body_entered(body: Node) -> void:
    if body == player:
        swipe_indicator.show_for_direction(Vector2.LEFT)

func _on_PlayerDetectorUp_body_entered(body: Node) -> void:
    if body == player:
        swipe_indicator.show_for_direction(Vector2.DOWN)

func _on_PlayerDetectorDown_body_entered(body) -> void:
     if body == player:
        swipe_indicator.show_for_direction(Vector2.UP)
