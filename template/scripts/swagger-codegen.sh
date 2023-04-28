#!/bin/bash

rm -rf ./openapi-typescript-client

generate() {
    # Generate client
    npx @openapitools/openapi-generator-cli generate -i $BASE_URL/swagger.yml -g typescript-aurelia -o ./openapi-typescript-client
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
        npx @openapitools/openapi-generator-cli generate -i $2 -g typescript-aurelia -o ./openapi-typescript-client
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
cp ./openapi-typescript-client/models.ts ./src/network/APITypes.ts


echo
echo
echo "***************************************************"
echo "ATTENTION Codegen was run for:" $BASE_URL
echo "***************************************************"
