extends Node2D

onready var Player = $Player

func _ready() -> void:
    var doors = get_tree().get_nodes_in_group("doors")
    for door in doors:
        door.connect("activated_door", self, "_on_Door_activated_door")

func _on_Door_activated_door(door, direction) -> void:
    var connecting_door = door.connecting_door
    Player.global_position = connecting_door.global_position + connecting_door.get_transfer_offset()
    Player.fsm.transition_to("idle", { "direction": direction })
