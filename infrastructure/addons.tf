# Production database
resource "heroku_addon" "breeder_database_production" {
  app  = "${heroku_app.breeder_backend_production.name}"
  plan = "${var.heroku_production_database}"
}