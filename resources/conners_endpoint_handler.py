def lambda_handler(event, context):
    # Get enrollment request status from FEMR central database
    status = "pending"

    return {
        'statusCode': 200,
        'body': str({'status': 'hello im conners endpoint'})
    }