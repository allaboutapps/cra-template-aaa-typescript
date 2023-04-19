#!/bin/bash

#####################################################
# DO NOT CHANGE THE PINNED VERSION OF swagger-codegen
#####################################################

generate() {
    # Generate client
    # modelPropertyNaming=original -> keep snake case names
    docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli:2.4.14 generate -i $BASE_URL/swagger.yml -l typescript-aurelia -o /local/swagger-typescript-client --additional-properties modelPropertyNaming=original,interface-only=true -DsupportingFiles -Dmodels
}

if [[ $1 = "local" ]]; then
    echo "local"
    # For local codegen use yarn codegen local filename (you have to be in project root, the filename.yml you're trying to import as well)
    if [ -z "$2" ]; then
        echo
        echo "***************************************************"
        echo "For local codegen provide a filename"
        echo "***************************************************"
        echo
        exit
    else
        BASE_URL=$2
        docker run --rm -v ${PWD}:/local swaggerapi/swagger-codegen-cli:2.4.14 generate -i /local/$2 -l typescript-aurelia -o /local/swagger-typescript-client --additional-properties modelPropertyNaming=original,interface-only=true -DsupportingFiles -Dmodels
    fi
elif [[ $1 = "localhost" ]]; then
    echo "localhost"
    BASE_URL="http://host.docker.internal:8081"
    generate
else
    echo "dev"
    BASE_URL="SET_YOUR_BASE_URL"
    generate
fi

# Copy models
cp ./swagger-typescript-client/models.ts ./src/network/APITypes.ts

echo
echo
echo "***************************************************"
echo "ATTENTION Codegen was run for:" $BASE_URL
echo "***************************************************"
