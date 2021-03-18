extends Node2D

onready var transition = $SwipeTransition

signal level_completed

onready var Player = $Player

func _ready() -> void:
    var rooms = get_tree().get_nodes_in_group("rooms")
    var first_room = rooms[0]
    for room in rooms:
        room.visible = false
    first_room.visible = true

    Player.camera.limit_to_room(first_room)

    var doors = get_tree().get_nodes_in_group("doors")
    for door in doors:
        door.connect("activated_door", self, "_on_Door_activated_door")

func _on_Door_activated_door(door, direction) -> void:
    var rooms = get_tree().get_nodes_in_group("rooms")
    var connecting_door = door.connecting_door
    var connecting_room = connecting_door.get_parent()

    transition.direction = direction
    transition.begin()
    yield(transition, "at_midpoint")

    Player.camera.smoothing_enabled = false
    Player.camera.limit_to_room(connecting_room)

    for room in rooms:
        room.visible = connecting_room.get_instance_id() == room.get_instance_id()

    Player.global_position = connecting_door.global_position + connecting_door.get_transfer_offset()
    Player.fsm.transition_to("idle", { "direction": direction })

    transition.finish()
    yield(transition, "finished")

    Player.camera.smoothing_enabled = true

func _on_Objective_activated() -> void:
    emit_signal("level_completed")
