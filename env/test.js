const testConfig = {
  env: 'test',
  port: 8000,
  security: {
    encryptions: {
      encrypt_type: 'sha256',
      encrypt_key: '4b 8?((~FKnpD))>8kb!B |#-uXIO24G3rc:&MG+FR{x;r#Uq4k{Ef@F4E9^-qS!', //change hash key
    },
    api: {
      appId: 'image-api-rest',
      appSecret: 'pDblTMZaFam59d@F9c#V1G9UEL17)Odz',
    },
    tokenLife: 3600
  },
  apiVersion: 'v1.0'
};

export default testConfig;
