@description('Deployment location')
param location string = resourceGroup().location

@description('Environment name')
@allowed([
  'dev'
  'test'
  'prod'
])
param environment string

@description('Project or application name')
param projectName string

@description('Admin username for VMs')
param adminUsername string

@secure()
@description('Admin password for VMs')
param adminPassword string

@description('Address space for VNet')
param vnetAddressSpace string = '10.10.0.0/16'

@description('App subnet CIDR')
param appSubnetPrefix string = '10.10.1.0/24'

@description('Private endpoint subnet CIDR')
param privateEndpointSubnetPrefix string = '10.10.2.0/24'

var namePrefix = '${projectName}-${environment}'
var tags = {
  Project: projectName
  Environment: environment
  ManagedBy: 'bicep'
}

//
// Networking
//
resource vnet 'Microsoft.Network/virtualNetworks@2023-11-01' = {
  name: '${namePrefix}-vnet'
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: [
        vnetAddressSpace
      ]
    }
    subnets: [
      {
        name: 'app'
        properties: {
          addressPrefix: appSubnetPrefix
        }
      }
      {
        name: 'private-endpoints'
        properties: {
          addressPrefix: privateEndpointSubnetPrefix
          privateEndpointNetworkPolicies: 'Disabled'
        }
      }
    ]
  }
}

//
// Log Analytics
//
resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: '${namePrefix}-law'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

//
// Application Insights
//
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${namePrefix}-appi'
  location: location
  kind: 'web'
  tags: tags
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalytics.id
  }
}

//
// App Service Plan
//
resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: '${namePrefix}-asp'
  location: location
  tags: tags
  sku: {
    name: 'P1v3'
    tier: 'PremiumV3'
    capacity: environment == 'prod' ? 2 : 1
  }
  properties: {
    reserved: true
  }
}

//
// Web App
//
resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: '${namePrefix}-web'
  location: location
  tags: tags
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: 'DOTNETCORE|8.0'
      alwaysOn: true
      appSettings: [
        {
          name: 'ASPNETCORE_ENVIRONMENT'
          value: environment
        }
        {
          name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
          value: appInsights.properties.InstrumentationKey
        }
      ]
    }
  }
}

//
// Storage Account
//
resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: toLower(replace('${namePrefix}sa', '-', ''))
  location: location
  tags: tags
  sku: {
    name: 'Standard_LRS'
  }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
  }
}

//
// Key Vault
//
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: '${namePrefix}-kv'
  location: location
  tags: tags
  properties: {
    tenantId: subscription().tenantId
    sku: {
      name: 'standard'
      family: 'A'
    }
    enableSoftDelete: true
    enableRbacAuthorization: true
  }
}

//
// Private Endpoint for Storage
//
resource storagePrivateEndpoint 'Microsoft.Network/privateEndpoints@2023-11-01' = {
  name: '${namePrefix}-sa-pe'
  location: location
  properties: {
    subnet: {
      id: vnet::subnets[1].id
    }
    privateLinkServiceConnections: [
      {
        name: 'storage-connection'
        properties: {
          privateLinkServiceId: storage.id
          groupIds: [
            'blob'
          ]
        }
      }
    ]
  }
}

//
// Outputs
//
output webAppName string = webApp.name
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output storageAccountName string = storage.name
output keyVaultName string = keyVault.name
output logAnalyticsWorkspaceId string = logAnalytics.id
