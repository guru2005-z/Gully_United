$envFilePath = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFilePath) {
    Get-Content $envFilePath | ForEach-Object {
        $line = $_.Trim()
        if ($line -and -not $line.StartsWith("#")) {
            $parts = $line.Split("=", 2)
            if ($parts.Count -eq 2) {
                $varName = $parts[0].Trim()
                $varVal = $parts[1].Trim()
                [System.Environment]::SetEnvironmentVariable($varName, $varVal, "Process")
            }
        }
    }
}

& "$PSScriptRoot\.maven\apache-maven-3.9.9\bin\mvn.cmd" spring-boot:run
