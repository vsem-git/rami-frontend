# deploy.ps1
$ErrorActionPreference = 'Stop'
try {
    ssh root@ramiclinic-residence.ru 'bash -lc "~/deploy.sh"'
    Write-Host "`n✅ Deploy finished." -ForegroundColor Green
}
catch {
    Write-Host "`n❌ Deploy failed: $($_.Exception.Message)" -ForegroundColor Red
}
finally {
    Read-Host "`nPress Enter to close this window"
}
