# deploy.ps1 — builds a deploy-ready copy of index.html with jsDelivr CDN URLs
# Usage: .\deploy.ps1
# Output: deploy/index.html (and copies all other files as-is)

$CDN = "https://cdn.jsdelivr.net/gh/Kuberwastaken/hob-revamped@main/assets/"
$src  = "index.html"
$out  = "deploy\index.html"

if (-not (Test-Path "deploy")) { New-Item -ItemType Directory "deploy" | Out-Null }

(Get-Content $src -Raw) -replace '="assets/', "=`"$CDN" | Set-Content $out -Encoding utf8

Write-Host "Deploy build written to $out"
Write-Host "CDN base: $CDN"
