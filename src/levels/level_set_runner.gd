extends Node2D
class_name LevelSetRunner

export(Resource) var level_set

var current_index := 0
var current_level = null

func _ready() -> void:
    _load_level(current_index)

func _load_level(index) -> void:
    current_level = level_set.levels[index].instance()
    current_level.connect("completed", self, "_on_Level_completed")
    add_child(current_level)

func _on_Level_completed() -> void:
    remove_child(current_level)
    current_level.queue_free();

    current_index += 1
    _load_level(current_index)
