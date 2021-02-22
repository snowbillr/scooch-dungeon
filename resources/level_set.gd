extends Resource

class_name LevelSet

export(Array, PackedScene) var levels := []
export(String) var name := ""

var length := 0 setget ,_get_length

func _get_length() -> int:
    return levels.size()
