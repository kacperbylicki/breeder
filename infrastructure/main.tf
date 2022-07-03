terraform {
  required_providers {
    heroku = {
      source  = "heroku/heroku"
      version = "~> 5.0"
    }
  }
}

provider "heroku" {
  email   = var.heroku_account_email
  api_key = var.heroku_api_key
}

provider "aws" {
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
  region = var.aws_region
}