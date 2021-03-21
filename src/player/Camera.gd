extends Camera2D

signal transition_halfway_finished

onready var AnimationPlayer = $AnimationPlayer
onready var transition_overlay = $icon

func limit_to_room(room: Room):
    var camera_limits = room.get_limits_for_camera()
    limit_left = camera_limits.left
    limit_top = camera_limits.top
    limit_right = camera_limits.right
    limit_bottom = camera_limits.bottom
