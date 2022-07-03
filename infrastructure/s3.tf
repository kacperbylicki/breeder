 resource "aws_s3_bucket" "breeder_image_bucket" {
   bucket = "breeder_image_bucket"
 }

 resource "aws_s3_bucket_acl" "breeder_image_bucket_acl" {
   bucket = aws_s3_bucket.breeder_image_bucket.id
   acl = "public-read"
 }

 resource "aws_s3_bucket_cors_configuration" "breeder_image_bucket" {
   bucket = aws_s3_bucket.breeder_image_bucket.bucket

   cors_rule {
     allowed_headers = ["*"]
     allowed_methods = ["PUT", "POST", "GET"]
     allowed_origins = ["*"]
     expose_headers  = ["ETag"]
     max_age_seconds = 3000
   }
 }