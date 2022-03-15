package colormapping

import (
	"testing"
)

func TestNewMapping(t *testing.T) {
	m := NewColorMapping()
	err := m.LoadDefaults()
	if err != nil {
		t.Fatal(err)
	}

	c := m.GetColor("scifi_nodes:blacktile2", 0)
	if c == nil {
		panic("no color")
	}

	c = m.GetColor("default:river_water_flowing", 0)
	if c == nil {
		panic("no color")
	}

	c = m.GetColor("unifiedbricks:brickblock_multicolor_dark", 100)
	if c == nil {
		panic("no color")
	}

	//if c.A != 128 {
	//	panic("wrong alpha")
	//}

}
