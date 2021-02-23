extends Node2D
class_name LevelSetRunner

export(Resource) var level_set

signal level_set_completed

var current_index := 0
var current_level = null

#func _ready() -> void:
#    _load_level(current_index)

func reset() -> void:
    current_index = 0
    current_level = null

func start() -> void:
    _load_level(current_index)

func _load_level(index) -> void:
    current_level = level_set.levels[index].instance()
    current_level.connect("completed", self, "_on_Level_completed")
    add_child(current_level)

func _on_Level_completed() -> void:
    remove_child(current_level)
    current_level.queue_free();

    if current_index == level_set.length - 1:
        emit_signal("level_set_completed")
    else:
        current_index += 1
        _load_level(current_index)
