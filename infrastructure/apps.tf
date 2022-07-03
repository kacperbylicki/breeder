resource "heroku_app" "breeder_backend_production" {
  name   = "${var.heroku_backend_production_app}"
  region = "${var.heroku_region}"

  # config_vars = {
  #     FILESYSTEMS_DEFAULT = "${var.filesystems_default}"
  #     FILESYSTEMS_S3_KEY = "${aws_iam_access_key.s3_rw.id}"
  #     FILESYSTEMS_S3_BUCKET = "${var.filesystems_s3_bucket}"
  #     FILESYSTEMS_S3_REGION = "${var.filesystems_s3_region}"
  #     FILESYSTEMS_S3_SECRET = "${aws_iam_access_key.s3_rw.secret}"
  # }

  buildpacks = "${var.heroku_app_buildpacks}"
}

resource "heroku_app" "breeder_frontend_production" {
  name   = "${var.heroku_frontend_production_app}"
  region = "${var.heroku_region}"

  # config_vars = {
  #     FILESYSTEMS_DEFAULT = "${var.filesystems_default}"
  #     FILESYSTEMS_S3_KEY = "${aws_iam_access_key.s3_rw.id}"
  #     FILESYSTEMS_S3_BUCKET = "${var.filesystems_s3_bucket}"
  #     FILESYSTEMS_S3_REGION = "${var.filesystems_s3_region}"
  #     FILESYSTEMS_S3_SECRET = "${aws_iam_access_key.s3_rw.secret}"
  # }

  buildpacks = "${var.heroku_app_buildpacks}"
}