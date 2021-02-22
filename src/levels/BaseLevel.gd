extends Node2D

signal completed

onready var player = $Player
onready var tilemap = $TileMap as TileMap
onready var objective = $Objective

onready var message = $LevelMessageLayer/UI/LevelMessage
onready var message_tween = $LevelMessageLayer/UI/LevelMessage/MessageTween as Tween
onready var message_pause_timer = $LevelMessageLayer/UI/LevelMessage/MessagePauseTimer as Timer

func _ready() -> void:
    objective.player = player

    var tilemap_limits = tilemap.get_used_rect()
    var cell_size = tilemap.cell_size
    var camera = player.get_node("Camera2D") as Camera2D
    camera.limit_left = tilemap_limits.position.x * cell_size.x
    camera.limit_top = tilemap_limits.position.y * cell_size.y
    camera.limit_right = tilemap_limits.end.x * cell_size.x
    camera.limit_bottom = tilemap_limits.end.y * cell_size.y

    message_tween.interpolate_property(message, "margin_top", -message.rect_size.y, get_viewport_rect().size.y / 2, 1.5, Tween.TRANS_QUAD, Tween.EASE_OUT)
    message_tween.start()
    yield(message_tween, "tween_completed")

    message_pause_timer.start()
    yield(message_pause_timer, "timeout")

    message_tween.interpolate_property(message, "margin_top", message.margin_top, message.rect_size.y + get_viewport_rect().size.y, 1.5, Tween.TRANS_QUAD, Tween.EASE_IN)
    message_tween.start()

func _on_Objective_completed() -> void:
    emit_signal("completed")
