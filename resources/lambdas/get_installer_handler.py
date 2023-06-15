import os
import boto3

# Get the latest installer version from s3
# The versions are stored with the key format: {platform}/{version}/{installer}.{pkg/exe}

def lambda_handler(event, context):
    s3 = boto3.client('s3')
    platform = event.get('pathParameters', {}).get('platform', 'macos')
    # Get all objects in the bucket
    response = s3.list_objects_v2(Bucket=os.environ['BUCKET_NAME'], Prefix=f'{platform}/')

    # Paginate if necessary
    while response['IsTruncated']:
        response['Contents'].extend(
            s3.list_objects_v2(
                Bucket=os.environ['BUCKET_NAME'],
                PaginationConfig={'StartingToken': response['NextToken']},
                Prefix=f'{platform}/'
            )['Contents']
        )

    if response['KeyCount'] > 0:
        # Get the latest version
        versions = map(lambda x: x['Key'].split('/')[1], response['Contents'])
        latest_version = sorted(versions, reverse=True)[0]

        # return presigned url for 12 hours
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            'body': s3.generate_presigned_url(
                ClientMethod='get_object',
                Params={
                    'Bucket': os.environ['BUCKET_NAME'],
                    'Key': f'{platform}/{latest_version}/femr-x64-{latest_version}.{"pkg" if platform == "macos" else "exe"}'
                },
                ExpiresIn=43200
            )
        }

    return {
        'statusCode': 404,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        'body': 'No versions found.'
    }