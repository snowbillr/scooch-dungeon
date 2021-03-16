extends Node2D

onready var Player = $Player
onready var TransitionAnimationPlayer = $Transition/AnimationPlayer

func _ready() -> void:
    var rooms = get_tree().get_nodes_in_group("rooms")
    var first_room = rooms[0]
    for room in rooms:
        room.visible = false
    first_room.visible = true

    _limit_camera_to_room(first_room)

    var doors = get_tree().get_nodes_in_group("doors")
    for door in doors:
        door.connect("activated_door", self, "_on_Door_activated_door")

func _on_Door_activated_door(door, direction) -> void:
    var rooms = get_tree().get_nodes_in_group("rooms")
    var connecting_door = door.connecting_door
    var connecting_room = connecting_door.get_parent()

    # TODO - this animation method seems to not work great. the rect is shifted
    # after the first transition. is there a different property we can animate instead?
    TransitionAnimationPlayer.play("transition_out")
    yield(TransitionAnimationPlayer, "animation_finished")

    Player.camera.smoothing_enabled = false
    _limit_camera_to_room(connecting_room)

    for room in rooms:
        room.visible = connecting_room.get_instance_id() == room.get_instance_id()

    Player.global_position = connecting_door.global_position + connecting_door.get_transfer_offset()
    Player.fsm.transition_to("idle", { "direction": direction })

    Player.camera.smoothing_enabled = true

    TransitionAnimationPlayer.play("transition_in")

func _limit_camera_to_room(room) -> void:
    var room_tilemap: TileMap = room.get_node("TileMap")
    var room_rect: Rect2 = room_tilemap.get_used_rect()
    var room_tile_size = room_tilemap.cell_size

    Player.camera.limit_left = room_rect.position.x * room_tile_size.x + room.position.x
    Player.camera.limit_top = room_rect.position.y * room_tile_size.y + room.position.y
    Player.camera.limit_right = room_rect.end.x * room_tile_size.x + room.position.x
    Player.camera.limit_bottom = room_rect.end.y * room_tile_size.y + room.position.y
