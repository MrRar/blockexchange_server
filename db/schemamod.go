package db

import (
	"blockexchange/types"

	"github.com/jmoiron/sqlx"
	"github.com/sirupsen/logrus"
)

type SchemaModRepository interface {
	CreateSchemaMod(schema_mod *types.SchemaMod) error
}

type DBSchemaModRepository struct {
	DB *sqlx.DB
}

func (repo DBSchemaModRepository) CreateSchemaMod(schema_mod *types.SchemaMod) error {
	logrus.WithFields(logrus.Fields{
		"schema_id": schema_mod.SchemaID,
		"mod_name":  schema_mod.ModName,
	}).Trace("db.CreateSchemaMod")

	query := `
		insert into
		schemamod(schema_id, mod_name)
		values(:schema_id, :mod_name)
		returning id
	`
	stmt, err := repo.DB.PrepareNamed(query)
	if err != nil {
		return err
	}
	return stmt.Get(&schema_mod.ID, schema_mod)
}
