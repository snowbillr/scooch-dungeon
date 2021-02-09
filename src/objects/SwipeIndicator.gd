extends Node2D

onready var up = $IndicatorUp
onready var down = $IndicatorDown
onready var left = $IndicatorLeft
onready var right = $IndicatorRight

func show_from_direction(direction) -> void:
    match direction:
        Vector2.UP:
            down.visible = true
            down.play()
        Vector2.DOWN:
            up.visible = true
            up.play()
        Vector2.LEFT:
            right.visible = true
            right.play()
        Vector2.RIGHT:
            left.visible = true
            left.play()

func hide_indicator() -> void:
    up.visible = false
    up.playing = false

    down.visible = false
    down.playing = false

    left.visible = false
    left.playing = false

    right.visible = false
    right.playing = false
