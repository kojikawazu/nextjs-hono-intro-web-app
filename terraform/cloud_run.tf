# ---------------------------------------------
# Cloud Run
# ---------------------------------------------
# Google Cloud Run のサービスアカウントを作成
resource "google_service_account" "cloud_run_sa" {
  account_id   = "cloud-run-sa"
  display_name = "Cloud Run Service Account"
}

# Google Cloud Run にデプロイするサービス
resource "google_cloud_run_service" "nextjs_hono_intro_app_service" {
  name     = var.service_name
  location = var.gcp_region

  metadata {
    namespace = var.gcp_project_id
  }

  template {
    spec {
      containers {
        image = "${var.gcp_region}-docker.pkg.dev/${var.gcp_project_id}/${google_artifact_registry_repository.nextjs_hono_intro_app_repo.repository_id}/${var.app_name}"

        ports {
          container_port = var.http_port
        }
        resources {
          limits = {
            cpu    = "1000m"
            memory = "512Mi"
          }
        }

        env {
          name  = "BACKEND_API_URL"
          value = var.backend_api_url
        }
        env {
          name  = "GCS_PRIVATE_BUCKET_NAME"
          value = var.gcs_private_bucket_name
        }
        env {
          name  = "GCS_JSON_PATH"
          value = var.gcs_json_path
        }
        env {
          name  = "ALLOWED_ORIGIN"
          value = var.allowed_origin
        }
        env {
          name  = "NODE_ENV"
          value = var.node_env
        }
        env {
          name  = "GOOGLE_APPLICATION_CREDENTIALS"
          value = var.google_application_credentials
        }
      }
      service_account_name = google_service_account.cloud_run_sa.email
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [
    google_artifact_registry_repository.nextjs_hono_intro_app_repo
  ]
}

# Cloud Run API を有効化
# resource "google_project_service" "run" {
#   service = "run.googleapis.com"
#   project = var.gcp_project_id
# }

