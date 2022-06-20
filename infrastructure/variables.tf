# Heroku Provider variables
variable "heroku_account_email" {
  sensitive = true
}
variable "heroku_api_key" {
  sensitive = true
}

# Apps variables
variable "heroku_backend_production_app" {}
variable "heroku_frontend_production_app" {}
variable "heroku_region" {}

variable "heroku_app_buildpacks" {
  type = "list"
}

# Addons variable
variable "heroku_production_database" {}