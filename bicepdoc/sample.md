# As Built: Bicep Resources
Generated: 2025-12-15T10:02:06.100Z

## Microsoft.Storage/storageAccounts/blobServices/containers
- **Symbol**: `stxxfftddf443iw_default_tokens`
- **API Version**: `2025-01-01`
- **Name**:
  ```
  'tokens'
  ```
- **Properties**:
  ```bicep
  {
    immutableStorageWithVersioning: {
      enabled: false
    }
    defaultEncryptionScope: '$account-encryption-key'
    denyEncryptionScopeOverride: false
    publicAccess: 'None'
  }
  ```
- **dependsOn**:
  - `[ stq7tssmXXfX2Xwx ]`
