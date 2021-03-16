extends Sprite

export(String, "top", "bottom", "left", "right") var wall
export(NodePath) onready var connecting_door = get_node_or_null(connecting_door)

signal activated_door

onready var SwipeIndicator = $SwipeIndicator
onready var Shadow = $Shadow

var touching_from = null

func _ready() -> void:
    _set_wall(wall)
    SwipeDetector.connect("swiped", self, "_on_SwipeDetector_swiped")

func get_transfer_offset() -> Vector2:
    var offset = 32

    match wall:
        "top":
            return Vector2(0, offset)
        "bottom":
            return Vector2(0, -offset)
        "left":
            return Vector2(offset, 0)
        "right":
            return Vector2(-offset, 0)

    return Vector2.ZERO

func _set_wall(wall) -> void:
    print("setting wall")
    print('to value %s' % wall)

    match wall:
        "top":
            frame = 0
            Shadow.offset = Vector2.UP * 16
        "bottom":
            frame = 1
            Shadow.offset = Vector2.DOWN * 16
        "left":
            frame = 2
            Shadow.offset = Vector2.RIGHT * 16
        "right":
            frame = 3
            Shadow.offset = Vector2.LEFT * 16

func _set_connecting_door(value) -> void:
    connecting_door = get_node_or_null(value)

func _on_PlayerDetector_player_detected_from(from_direction) -> void:
    touching_from = from_direction
    SwipeIndicator.show_from_direction(from_direction)

func _on_PlayerDetector_player_lost() -> void:
    touching_from = null
    SwipeIndicator.hide_indicator()

func _on_SwipeDetector_swiped(direction) -> void:
    if touching_from != null && direction == touching_from * -1:
        emit_signal("activated_door", self)
#        get_tree().set_input_as_handled()
