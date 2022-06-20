resource "heroku_app" "breeder_backend_production" {
  name   = "${var.heroku_backend_production_app}"
  region = "${var.heroku_region}"

  config_vars {
    APP_ENV = "production"
  }

  buildpacks = "${var.heroku_app_buildpacks}"
}

resource "heroku_app" "breeder_frontend_production" {
  name   = "${var.heroku_frontend_production_app}"
  region = "${var.heroku_region}"

  config_vars {
    APP_ENV = "production"
  }

  buildpacks = "${var.heroku_app_buildpacks}"
}