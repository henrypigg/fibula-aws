import boto3
import logging

def lambda_handler(event, context):
    # Get enrollment request status from FEMR central database
    status = "pending"

    return {
        'statusCode': 200,
        'body': {'status': status}
    }