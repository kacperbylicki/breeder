# Production database
resource "heroku_addon" "breeder_database_production" {
  app_id = heroku_app.breeder_backend_production.id
  plan = var.heroku_production_database
}