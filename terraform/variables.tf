# ---------------------------------------------
# Variables
# ---------------------------------------------
variable "project" {
  type = string
}

variable "environment" {
  type = string
}

variable "gcp_project_id" {
  type = string
}

variable "gcp_region" {
  type = string
}

variable "http_port" {
  type = number
}

variable "invoker_member" {
  type = string
}

variable "invoker_role" {
  type = string
}

variable "service_name" {
  type = string
}

variable "repository_id" {
  type = string
}

variable "app_name" {
  type = string
}

variable "backend_api_url" {
  type = string
}

variable "allowed_origin" {
  type = string
}

variable "gcs_private_bucket_name" {
  type = string
}

variable "gcs_json_path" {
  type = string
}

variable "node_env" {
  type = string
}

variable "google_application_credentials" {
  type = string
}


