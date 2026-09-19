if (-not (Get-Command -Name bun -ErrorAction SilentlyContinue)) {
    powershell -c "irm bun.sh/install.ps1 | iex"
    
    if ($PSVersionTable.PSEdition -eq 'Core') {
        pwsh
    }
    elseif ($PSVersionTable.PSEdition -eq 'Desktop') {
        powershell
    }
}

Set-Alias -Name npm -Value bun
Set-Alias -Name npx -Value bunx

Set-Alias -Name pnpm -Value bun
Set-Alias -Name pnpx -Value bunx

function create {
    & "$env:USERPROFILE\.bun\bin\bun.exe" "run" "create" $args
}