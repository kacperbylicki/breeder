output "production_git_url" {
  value = heroku_app.breeder_backend_production.git_url
}

output "breeder_image_bucket_name" {
  value = aws_s3_bucket.breeder_image_bucket.id
}
