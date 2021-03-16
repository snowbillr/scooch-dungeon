extends Node2D

onready var Player = $Player

func _ready() -> void:
    var doors = get_tree().get_nodes_in_group("doors")
    for door in doors:
        door.connect("activated_door", self, "_on_Door_activated_door")

func _on_Door_activated_door(door) -> void:
    print("going to transfer player")
    var connecting_door = door.connecting_door
    Player.global_position = connecting_door.global_position + connecting_door.get_transfer_offset()

    # TODO - BUG
    # the player moves a tiny bit before this transition is called
    # how can i prevent its movement from happening from its swipe handler?
    # the player's swipe handler is called after this door's. can i cancel the signal?
    Player.fsm.call_deferred("transition_to", "idle", {})

    # Taking inspiration from the Godot touch input manager: https://github.com/Federico-Ciuffardi/Godot-Touch-Input-Manager
    # I think I can use `Input.parse_input_event` on a new `InputEventAction`, and then use `get_tree().set_input_as_handled()` to stop its propagation.
    # https://docs.godotengine.org/en/stable/classes/class_input.html#class-input-method-parse-input-event
    # This might mean redoing the SwipeDetector to give an `swiped` action to the parsed input
    # and using `Input.is_action_pressed` in the player fsm and anywhere else we care about swipes.
    # Then we aren't using signals for input but the actual `Input` singleton itself.

    # Or maybe rather than an `action` and `pressed` we just use the `_input` callback on the nodes that care.
