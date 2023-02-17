#!/bin/zsh
results=$(aws cloudfront list-distributions | jq -r '.DistributionList.Items[0]| {"distro_id":.Id, "domain": .DomainName}')
DISTRO_ID=$(echo $results | jq -r '.distro_id')
DOMAIN_NAME=$(echo $results | jq -r '.domain')

aws s3 cp ./build s3://react-logic --recursive
aws cloudfront create-invalidation --distribution-id $DISTRO_ID --paths '/*'

echo "Go to: https://$DOMAIN_NAME"