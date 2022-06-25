# Heroku provider variables
variable "heroku_account_email" {
  sensitive = true
}
variable "heroku_api_key" {
  sensitive = true
}

# AWS provider variables
# variable "aws_access_key" {
#   sensitive = true
# }
# variable "aws_secret_key" {
#   sensitive = true
# }
# variable "aws_region" {
#   default = "eu-central-1"
# }

# Apps variables
variable "heroku_backend_production_app" {}
variable "heroku_frontend_production_app" {}
variable "heroku_region" {
  default = "eu"
}

variable "heroku_app_buildpacks" {
  type = "list"
  default = ["heroku/nodejs"]
}

# Addons variable
variable "heroku_production_database" {
  default = "heroku-postgresql:hobby-basic"
}