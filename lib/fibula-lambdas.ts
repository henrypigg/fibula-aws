import * as cdk from 'aws-cdk-lib';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { Runtime, Code } from 'aws-cdk-lib/aws-lambda'
import { Topic } from 'aws-cdk-lib/aws-sns';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

interface FibulaLambdasProps {
    topic: Topic
}

export class FibulaLambdas extends Construct {
    readonly sendRequestLambda: Function;
    readonly sendResponseLambda: Function;
    readonly requestStatusLambda: Function;

    constructor(scope: Construct, id: string, props: FibulaLambdasProps) {
        super(scope, id);

        this.sendRequestLambda = new Function(scope, 'SendEnrollmentRequestLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources"),
            handler: "send_email_handler.lambda_handler",
            environment: {
                TOPIC_ARN: props.topic.topicArn
            }
        });

        this.sendResponseLambda = new Function(scope, 'SendEnrollmentResponseLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources"),
            handler: "send_response_handler.lambda_handler"
        });

        this.requestStatusLambda = new Function(scope, 'RequestStatusLambda', {
            runtime: Runtime.PYTHON_3_9,
            code: Code.fromAsset("resources"),
            handler: "request_status_handler.lambda_handler"
        });

        props.topic.grantPublish(this.sendRequestLambda);
  }
}
