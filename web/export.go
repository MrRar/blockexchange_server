package web

import (
	"blockexchange/core"
	"blockexchange/types"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func (api *Api) ExportWorldeditSchema(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		SendError(w, 500, err.Error())
		return
	}

	var schemapart *types.SchemaPart
	it := func() (*types.SchemaPart, error) {
		var err error
		if schemapart == nil {
			schemapart, err = api.SchemaPartRepo.GetFirstBySchemaID(int64(id))
		} else {
			schemapart, err = api.SchemaPartRepo.GetNextBySchemaIDAndOffset(int64(id), schemapart.OffsetX, schemapart.OffsetY, schemapart.OffsetZ)
		}
		return schemapart, err
	}

	err = core.ExportWorldeditSchema(w, it)
	if err != nil {
		SendError(w, 500, err.Error())
	}
}
