# 環境変数の設定

## アプリケーション側の設定

.envに以下の環境変数を設定します。

```bash
BACKEND_API_URL=
GCS_PRIVATE_BUCKET_NAME=
GCS_JSON_PATH=
ALLOWED_ORIGIN=
NODE_ENV=
MY_MAIL_ADDRESS=
RESEND_API_KEY=
RESEND_SEND_DOMAIN=
API_VALIDATE_SECRET_TOKEN=
API_SECRET_TOKEN=
NEXT_PUBLIC_API_TOKEN=
```

## Terraformの設定

terraform.tfvarsに以下の環境変数を設定します。

```bash
project = ""
environment = ""
gcp_project_id = ""
gcp_region = ""
http_port = 
invoker_member = ""
invoker_role = ""
service_name = ""
repository_id = ""
app_name = ""
custom_domain_name = ""
domain_zone_name = ""
domain_zone_dns_name = ""
backend_api_url = ""
allowed_origin = ""
gcs_private_bucket_name = ""
gcs_json_path = ""
node_env = ""
my_mail_address = ""
resend_api_key = ""
resend_send_domain = ""
api_validate_secret_token = ""
api_secret_token = ""
next_public_api_token = ""
```

## GitHub Actionsの設定

.github/workflows/deploy_to_googlecloud.ymlに以下のシークレットを使用します。
GitHubのリポジトリのSettingsからSecrets and variablesを選択し、以下のシークレットを設定します。

```bash
GCP_SERVICE_ACCOUNT_KEY
GCP_PROJECT_ID
GCP_REGION
REPO_NAME
APP_NAME
GCP_CLOUD_RUN_SERVICE_NAME
NEXT_PUBLIC_VISIT_ID_KEY
NEXT_PUBLIC_BACKEND_API_URL
ALLOWED_ORIGIN
BACKEND_API_URL
GCS_PRIVATE_BUCKET_NAME
GCS_JSON_PATH
NODE_ENV
MY_MAIL_ADDRESS
RESEND_API_KEY
RESEND_SEND_DOMAIN
API_VALIDATE_SECRET_TOKEN
API_SECRET_TOKEN
NEXT_PUBLIC_API_TOKEN
```
