
# PowerShell script to find process by port and kill it
param([int]$port)

$tcp = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
if ($tcp) {
    Write-Host "Killing process on port $port (PID: $($tcp.OwningProcess))"
    Stop-Process -Id $tcp.OwningProcess -Force
} else {
    Write-Host "No process found on port $port"
}
