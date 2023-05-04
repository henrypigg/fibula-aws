import * as cdk from 'aws-cdk-lib';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { Runtime, Code } from 'aws-cdk-lib/aws-lambda'
import { Topic } from 'aws-cdk-lib/aws-sns';
import { Bucket } from 'aws-cdk-lib/aws-s3';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface FibulaLambdasProps {
    topic: Topic;
    installerBucket: Bucket;
    domainName: string;
}

export class FibulaLambdas extends Construct {
    readonly defaultLambda: Function;
    readonly sendRequestLambda: Function;
    readonly sendResponseLambda: Function;
    readonly requestStatusLambda: Function;
    readonly getInstallerLambda: Function;

    constructor(scope: Construct, id: string, props: FibulaLambdasProps) {
        super(scope, id);

        this.defaultLambda = new Function(scope, 'DefaultLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources/lambdas"),
            handler: "default_handler.lambda_handler"
        });

        this.sendRequestLambda = new Function(scope, 'SendEnrollmentRequestLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources/lambdas"),
            handler: "send_request_handler.lambda_handler",
            environment: {
                TOPIC_ARN: props.topic.topicArn,
                DOMAIN_NAME: props.
            }
        });

        this.sendResponseLambda = new Function(scope, 'SendEnrollmentResponseLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources/lambdas"),
            handler: "send_response_handler.lambda_handler"
        });

        this.requestStatusLambda = new Function(scope, 'RequestStatusLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources/lambdas"),
            handler: "request_status_handler.lambda_handler"
        });

        this.getInstallerLambda = new Function(scope, 'GetInstallerLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources/lambdas"),
            handler: "get_installer_handler.lambda_handler",
            environment: {
                BUCKET_NAME: props.installerBucket.bucketName
            }
        });

        props.topic.grantPublish(this.sendRequestLambda);
        props.installerBucket.grantRead(this.getInstallerLambda);
  }
}
