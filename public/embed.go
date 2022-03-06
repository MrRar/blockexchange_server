package public

import (
	"embed"
)

//go:embed js/* pics/* index.html
//go:embed node_modules/bootswatch/dist/cyborg/bootstrap.min.css
//go:embed node_modules/vue/dist/vue.global.prod.js
//go:embed node_modules/vue-router/dist/vue-router.global.prod.js
//go:embed node_modules/vue-i18n/dist/vue-i18n.global.prod.js
//go:embed node_modules/@fortawesome/fontawesome-free/css/all.min.css
//go:embed node_modules/@fortawesome/fontawesome-free/webfonts/*
var Webapp embed.FS
