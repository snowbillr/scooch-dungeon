extends Node

class_name FizzyMachine, "res://addons/fizzy/fizzy_machine_icon.png"

export(String) var initial_state_name = ""
export(NodePath) var target_path = null

var target = null
var states = []
var current_state = null
var current_state_transition_triggers = []

func _ready() -> void:
    target = get_node(target_path)
    states = get_children()

    for state in states:
        state.target = target
        state.fsm = self

    current_state = _get_state_by_name(initial_state_name)
    current_state.call_deferred("fizzy_enter", {})

func transition_to(state_name: String, data) -> void:
    current_state_transition_triggers = []

    current_state.fizzy_exit(data)

    current_state = _get_state_by_name(state_name)

    current_state.fizzy_enter(data)

func register_transition_trigger(to: String, trigger) -> void:
    current_state_transition_triggers.append({
        "to": to,
        "trigger": trigger
    })

func _process(delta: float) -> void:
    current_state.fizzy_process(delta)

    for transition_trigger in current_state_transition_triggers:
        var trigger_value = transition_trigger["trigger"].call_func()
        if trigger_value != null:
            transition_to(transition_trigger["to"], trigger_value)
            break;

func _physics_process(delta: float) -> void:
    current_state.fizzy_physics_process(delta)

func _input(event: InputEvent) -> void:
    current_state.fizzy_input(event)

func _unhandled_input(event: InputEvent) -> void:
    current_state.fizzy_unhandled_input(event)

func _get_state_by_name(state_name: String) -> Node:
    for state in states:
        if state.name == state_name:
            return state
    return null
