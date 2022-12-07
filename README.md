# fEMR Self-Bulding Kit

### Description
fEMR is a fast EMR solution for remote clinics who depend on speed and ease of use rather than complex features.

### Dependencies
- [Docker](https://docs.docker.com/get-docker/)

### Running the Docker Image
1. Clone the [super-femr repo](https://github.com/CPSECapstone/super-femr).
2. Ensure Docker is running.
3. ```docker-compose up```

On M1 macOS, the following line needs to be added to the `docker-compose.yml` file for both services. 
```
platform: linux/x86_64
```

### Installer

Check out our [installer repo](https://github.com/CPSECapstone/macos-installer-builder-femr/tree/master) for directions on how to setup the installer.

## Continous Integration
Link to CI setup: 
